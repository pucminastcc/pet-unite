import {Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {User, UserModel} from '../../../domain/auth/models/user.model';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import {ValidateFacebookUserDto} from '../../../domain/auth/dtos/validate-facebook-user.dto';
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
import {MailService} from '../../../shared/mail/services/mail.service';
import {UtilService} from '../../../shared/util/services/util.service';
import {JwtService} from '@nestjs/jwt';
import {ConfirmEmailDto} from '../../../domain/auth/dtos/confirm-email.dto';
import {ConfirmEmailResult} from '../../../domain/auth/models/results/email-confirmation.result';
import {ConfirmEmailMessage} from '../../../domain/auth/enums/confirm-email-message.enum';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {GetUserDto} from '../../../domain/auth/dtos/get-user.dto';
import {GetUserResult} from '../../../domain/auth/models/results/get-user.result';
import {PasswordResetCode} from '../../../domain/auth/models/password-reset-code.model';
import {Account} from '../../../domain/auth/models/account.model';


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

    private getPayload(doc): UserModel {
        return {
            id: doc.id,
            email: doc.email,
            username: doc.username,
            img: doc.img,
            personTypeId: doc.personTypeId,
            document: doc.document,
            zipCode: doc.zipCode,
            address: doc.address,
            isSuperUser: doc.isSuperUser
        };
    }

    async validateLocalUser(input: ValidateLocalUserDto): Promise<ValidateUserResult> {
        let result: ValidateUserResult = {payload: undefined, message: LoginMessage.UserNotFound};

        const {email, password} = input;
        const doc = await this.userModel.findOne({email, provider: 'application'}).exec();

        if (doc) {
            const isMatch = await bcrypt.compare(password, doc.password);
            if (isMatch) {
                if (!doc.activated) {
                    const userId = doc.id;
                    const enc = await this.utilService.encrypt(userId);
                    const token = `${enc.content}${enc.iv}`;

                    await this.accountModel.deleteMany({userId});
                    await this.accountModel.insertMany({token, userId});

                    this.mailService.sendUserConfirmation(doc, token);

                    result = {
                        ...result,
                        message: LoginMessage.YourAccountHasNotBeenActivated
                    }
                } else {
                    result = {
                        payload: this.getPayload(doc),
                        message: LoginMessage.UserIsAuthenticated
                    }
                }
            }
        }
        return result;
    }

    async validateFacebookUser(input: ValidateFacebookUserDto): Promise<ValidateUserResult> {
        let result: ValidateUserResult = {payload: undefined, message: LoginMessage.UserNotFound};

        const {email, img} = input;
        let doc = await this.userModel.findOne({email, provider: 'facebook'}).exec();
        doc.img = img;

        if (doc) {
            result = {
                payload: this.getPayload(doc),
                message: LoginMessage.UserIsAuthenticated
            }
        }
        return result;
    }

    async login(input: LoginDto): Promise<LoginResult> {
        const {payload, message} = input;
        let result = {accessToken: undefined, user: payload, message};

        if (payload) {
            result = {
                accessToken: this.jwtService.sign({...payload, img: ''}),
                user: {
                    email: payload.email,
                    username: payload.username,
                    img: payload.img,
                    isSuperUser: payload.isSuperUser
                },
                message
            }
        }
        return result;
    }

    async register(input: RegisterDto): Promise<RegisterResult> {
        let result: RegisterResult = {success: false, message: RegisterMessage.EmailAddressAlreadyExists};
        let {email, provider, password, activated} = input;
        provider = !provider ? 'application' : provider;

        const docExstingEmail = await this.userModel.findOne({
            email, provider
        }).exec();

        if (!docExstingEmail) {
            let doc: RegisterDto = input;
            const salt = await bcrypt.genSalt();
            doc.password = await bcrypt.hashSync(password, salt);

            const insert = await this.userModel.insertMany(doc);

            if (insert) {
                const user = insert[0];
                const enc = await this.utilService.encrypt(user.id);
                const token = `${enc.content}${enc.iv}`

                if (!activated) {
                    await this.accountModel.insertMany({token, userId: user.id});
                    try {
                        await this.mailService.sendUserConfirmation(user, token);
                    } catch (error) {
                        await this.userModel.deleteOne({email: user.email});
                        error.statusCode = 400;
                        throw error;
                    }
                }
                result = {success: true, message: RegisterMessage.SuccessfulRegistration};
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

    async confirmEmail(input: ConfirmEmailDto): Promise<ConfirmEmailResult> {
        let result: ConfirmEmailResult = {success: false, message: ConfirmEmailMessage.InvalidOrExpired};

        const {token} = input;
        const account = await this.accountModel.findOne({token}).exec();

        if (account) {
            const user = await this.userModel.findOne({_id: account.userId});
            if (user) {
                if (!user.activated) {
                    const id = user.id;
                    await this.userModel.findOneAndUpdate({_id: id}, {activated: true});
                    await this.accountModel.deleteOne({_id: account.id});

                    result = {success: true, message: ConfirmEmailMessage.Success}
                } else {
                    result = {success: false, message: ConfirmEmailMessage.YourAccountAlreadyActivated}
                }
            }
        }
        return result;
    }

    async getUser(input: GetUserDto): Promise<GetUserResult> {
        let result: GetUserResult = {success: false, data: undefined};
        const {id} = input;

        const user = await this.userModel.findById(id).exec();

        if (user) {
            result = {
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    img: user.img,
                    personTypeId: user.personTypeId,
                    document: user.document,
                    zipCode: user.zipCode,
                    address: user.address,
                    district: user.district,
                    city: user.city,
                    state: user.state,
                    complement: user.complement,
                    phone: user.phone,
                    cell: user.cell,
                    whatsapp: user.whatsapp,
                }
            }
        }
        return result;
    }

    async updateUser(input: UpdateUserDto): Promise<UpdateUserResult> {
        let result: UpdateUserResult = {success: false, message: ''};
        const {
            id, username, personTypeId, document, zipCode, address, district, city, state, complement, cell,
            phone, whatsapp, img
        } = input;

        const update = await this.userModel.findOneAndUpdate({
            _id: id
        }, {
            username, personTypeId, document, zipCode, address, district, city, state, complement, phone, cell,
            whatsapp, img
        });

        if (update) {
            result = {
                success: true,
                message: ''
            }
        }

        return result;
    }
}
