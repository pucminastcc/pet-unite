import {Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {User} from '../../../domain/auth/models/interfaces/user.interface';
import {PasswordReset} from '../../../domain/auth/models/interfaces/password-reset.interface';
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


@Injectable()
export class AuthRepository extends IAuthRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('PasswordReset') private readonly passwordResetModel: Model<PasswordReset>,
    ) {
        super();
    }

    async login(input: LoginDto): Promise<LoginResult> {
        let result: LoginResult = {accessToken: undefined, user: undefined, message: LoginMessage.UserNotFound};

        const {email, password} = input;
        const doc = await this.userModel.findOne({email}).exec();

        const isMatch = await bcrypt.compare(password, doc.password);

        if (isMatch) {
            if (!doc.activated) {
                result = {...result, message: LoginMessage.YourAccountHasNotBeenActivated}
                return result;
            }

            result = {
                accessToken: 'myBearerToken',
                user: {email: doc.email, username: doc.username},
                message: LoginMessage.UserIsAuthenticated
            }
        }
        return result;
    }

    async register(input: RegisterDto): Promise<RegisterResult> {
        let result: RegisterResult = {success: false, message: RegisterMessage.EmailAddressAlreadyExists};

        const {email, username} = input;
        const docExistingEmail = await this.userModel.findOne({email}).exec();
        const docExistingUsername = await this.userModel.findOne({username}).exec();

        if (!docExistingEmail && !docExistingUsername) {
            const doc: RegisterDto = {...input, terms: true, activated: false};

            const salt = await bcrypt.genSalt();
            doc.password = await bcrypt.hashSync(doc.password, salt);

            await this.userModel.insertMany(doc);

            // Impl. Send Mail

            result = {success: true, message: RegisterMessage.SuccessfulRegistration};
            return result;
        } else {
            if (docExistingEmail)
                return result;
            else if (docExistingUsername) {
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
        const doc = await this.userModel.findOne({email}).exec();

        if (doc) {
            const generatedCode = await crypto.randomBytes(Math.ceil(10 / 2))
                .toString('hex')
                .slice(0, 10)
                .toUpperCase();

            const update = await this.passwordResetModel.findOneAndUpdate({userId: doc._id}, {
                code: generatedCode
            }).exec();

            if (!update) {
                await this.passwordResetModel.insertMany({
                    email: doc.email,
                    code: generatedCode
                });
            }

            // Impl. Send Mail

            result = {success: true, message: SendPasswordResetCodeMessage.VerificationCodeSent};
            return result;
        }
        return result;
    }

    async validatePasswordResetCode(input: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        let result: SendPasswordResetCodeResult = {
            success: false,
            message: ValidatePasswordResetCodeMessage.IsInvalidOrExpired
        };

        const {code, email} = input;
        const doc = await this.passwordResetModel.findOne({code, email}).exec();

        if (doc)
            result = {success: true, message: ValidatePasswordResetCodeMessage.HasBeenSuccessfullyVerified};

        return result;
    }

    async changePassword(input: ChangePasswordDto): Promise<ChangePasswordResult> {
        let result: ChangePasswordResult = {success: false, message: ChangePasswordMessage.Error};

        result = {success: true, message: ChangePasswordMessage.Success};
        return result;
    }
}
