import {Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {User} from '../../../domain/auth/models/interfaces/user.interface';
import {PasswordResetCode} from '../../../domain/auth/models/interfaces/password-reset.interface';
import {Account} from '../../../domain/auth/models/interfaces/account.interface';
import {ValidateUserDto} from '../../../domain/auth/dtos/validate-user.dto';
import {ValidateUserResult} from '../../../domain/auth/models/results/validate-user.result';
import {LoginDto} from '../../../domain/auth/dtos/login.dto';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {LoginMessage} from '../../../domain/auth/enums/login-message.enum';
import {RegisterDto} from '../../../domain/auth/dtos/register.dto';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {RegisterMessage} from '../../../domain/auth/enums/register-message.enum';
import {SendPasswordResetCodeDto} from 'src/domain/auth/dtos/send-password-reset-code.dto';
import {SendPasswordResetCodeResult} from 'src/domain/auth/models/results/send-password-reset-code.result';
import {SendPasswordResetCodeMessage} from '../../../domain/auth/enums/send-password-reset-code-message.enum';
import {ValidatePasswordResetCodeDto} from 'src/domain/auth/dtos/validate-password-reset-code.dto';
import {ValidatePasswordResetCodeResult} from 'src/domain/auth/models/results/validate-password-reset-code.result';
import {ValidatePasswordResetCodeMessage} from '../../../domain/auth/enums/validate-password-reset-code-message.enum';
import {ChangePasswordDto} from 'src/domain/auth/dtos/change-password.dto';
import {ChangePasswordResult} from 'src/domain/auth/models/results/change-password.result';
import {ChangePasswordMessage} from '../../../domain/auth/enums/change-password-message.enum';
import {EmailConfirmationDto} from '../../../domain/auth/dtos/email-confirmation.dto';
import {EmailConfirmationResult} from '../../../domain/auth/models/results/email-confirmation.result';
import {EmailConfirmationMessage} from '../../../domain/auth/enums/confirm-email.message';
import {MailService} from '../../../shared/mail/services/mail.service';
import {UtilService} from '../../../shared/util/services/util.service';
import {JwtService} from '@nestjs/jwt';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';


@Injectable()
export class AuthRepository extends IAuthRepository {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('PasswordResetCode') private readonly passwordResetCodeModel: Model<PasswordResetCode>,
        @InjectModel('Account') private readonly accountModel: Model<Account>,
        private readonly mailService: MailService,
        private readonly utilService: UtilService,
        private readonly jwtService: JwtService
    ) {
        super();
    }

    async validateUser(input: ValidateUserDto): Promise<ValidateUserResult> {
        let result: ValidateUserResult = {payload: undefined, message: LoginMessage.UserNotFound};

        const {email, password} = input;
        const doc = await this.userModel.findOne({email, provider: 'application'}).exec();

        if (doc) {
            const isMatch = await bcrypt.compare(password, doc.password);
            if (isMatch) {
                if (!doc.activated) {
                    const userId = doc.id;
                    const enc = await this.utilService.encrypt(userId);
                    const token = enc.content + enc.iv;

                    await this.accountModel.deleteMany({userId});
                    await this.accountModel.insertMany({token, userId});

                    this.mailService.sendUserConfirmation(doc, token);

                    result = {
                        ...result,
                        message: LoginMessage.YourAccountHasNotBeenActivated
                    }
                } else {
                    result = {
                        payload: {
                            email: doc.email,
                            username: doc.username
                        },
                        message: LoginMessage.UserIsAuthenticated
                    }
                }
            }
        }
        return result;
    }

    async login(input: LoginDto): Promise<LoginResult> {
        const {payload, message} = input;
        let result = {accessToken: undefined, user: payload, message};

        if (payload) {
            result = {
                ...result,
                accessToken: this.jwtService.sign(payload)
            }
        }
        return result;
    }

    async register(input: RegisterDto): Promise<RegisterResult> {
        let result: RegisterResult = {success: false, message: RegisterMessage.EmailAddressAlreadyExists};

        const {email, username} = input;
        const docExistingEmail = await this.userModel.findOne({email, provider: 'application'}).exec();
        const docExistingUsername = await this.userModel.findOne({username, provider: 'application'}).exec();

        if (!docExistingEmail && !docExistingUsername) {
            const doc: RegisterDto = {...input, terms: true, activated: false, provider: 'application'};

            const salt = await bcrypt.genSalt();
            doc.password = await bcrypt.hashSync(doc.password, salt);

            const exec = await this.userModel.insertMany(doc);

            if (exec) {
                const user = exec[0];
                const enc = await this.utilService.encrypt(user.id);
                const token = enc.content + enc.iv;

                await this.accountModel.insertMany({token, userId: user.id});

                this.mailService.sendUserConfirmation(user, token);

                result = {success: true, message: RegisterMessage.SuccessfulRegistration};
            }
            return result;
        } else {
            if (docExistingEmail)
                return result;

            if (docExistingUsername) {
                result = {...result, message: RegisterMessage.UsernameAlreadyExists};
                return result;
            }
        }
        return result;
    }

    async sendPasswordResetCode(input: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        let result: SendPasswordResetCodeResult = {
            success: false,
            message: SendPasswordResetCodeMessage.EmailAddressNotFound
        };

        const {email} = input;
        const doc = await this.userModel.findOne({email, provider: 'application'}).exec();

        if (doc) {
            const generatedCode = await crypto.randomBytes(Math.ceil(10 / 2))
                .toString('hex')
                .slice(0, 10)
                .toUpperCase();

            const update = await this.passwordResetCodeModel.findOneAndUpdate({userId: doc._id}, {
                code: generatedCode
            }).exec();

            if (!update) {
                await this.passwordResetCodeModel.insertMany({
                    email: doc.email,
                    code: generatedCode
                });
            }

            await this.mailService.sendPasswordResetCode(doc.email, generatedCode);

            result = {success: true, message: SendPasswordResetCodeMessage.VerificationCodeSent};
            return result;
        }
        return result;
    }

    async validatePasswordResetCode(input: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        let result: ValidatePasswordResetCodeResult = {
            success: false,
            message: ValidatePasswordResetCodeMessage.IsInvalidOrExpired,
            passwordResetCode: undefined
        };

        const {code, email} = input;
        const doc = await this.passwordResetCodeModel.findOne({code, email}).exec();

        if (doc)
            result = {
                success: true, message: ValidatePasswordResetCodeMessage.HasBeenSuccessfullyVerified,
                passwordResetCode: {
                    email: doc.email,
                    code: doc.code
                }
            };

        return result;
    }

    async changePassword(input: ChangePasswordDto): Promise<ChangePasswordResult> {
        let result: ChangePasswordResult = {success: false, message: ChangePasswordMessage.Error};
        const {email, code, password} = input;

        const docExistingCode = await this.passwordResetCodeModel.findOne({email, code}).exec();

        if (docExistingCode) {
            const salt = await bcrypt.genSalt();
            const encPassword = await bcrypt.hashSync(password, salt);

            const doc = await this.userModel.findOneAndUpdate({email, provider: 'application'}, {
                password: encPassword
            });

            if (doc)
                result = {success: true, message: ChangePasswordMessage.Success};
        }
        return result;
    }

    async confirmEmail(input: EmailConfirmationDto): Promise<EmailConfirmationResult> {
        let result: EmailConfirmationResult = {success: false, message: EmailConfirmationMessage.InvalidOrExpired};

        const {token} = input;
        const account = await this.accountModel.findOne({token}).exec();

        if (account) {
            const user = await this.userModel.findOne({id: account.userId});
            if (!user.activated) {
                const id = user.id;
                await this.userModel.findOneAndUpdate({id}, {activated: true});

                result = {success: true, message: EmailConfirmationMessage.Success}
            } else {
                result = {success: false, message: EmailConfirmationMessage.YourAccountAlreadyActivated}
            }
        }
        return result;
    }

    async updateUser(input: UpdateUserDto): Promise<UpdateUserResult> {
        return Promise.resolve(undefined);
    }
}
