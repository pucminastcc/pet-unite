import {ValidateLocalUserDto} from '../dtos/validate-local-user.dto';
import {ValidateUserResult} from '../models/results/validate-user.result';
import {LoginDto} from '../dtos/login.dto';
import {LoginResult} from '../models/results/login.result';
import {RegisterDto} from '../dtos/register.dto';
import {RegisterResult} from '../models/results/register.result';
import {SendPasswordResetCodeDto} from '../dtos/send-password-reset-code.dto';
import {SendPasswordResetCodeResult} from '../models/results/send-password-reset-code.result';
import {ValidatePasswordResetCodeDto} from '../dtos/validate-password-reset-code.dto';
import {ValidatePasswordResetCodeResult} from '../models/results/validate-password-reset-code.result';
import {ChangePasswordDto} from '../dtos/change-password.dto';
import {ChangePasswordResult} from '../models/results/change-password.result';
import {ConfirmEmailDto} from '../dtos/confirm-email.dto';
import {ConfirmEmailResult} from '../models/results/email-confirmation.result';
import {GetUserDto} from '../dtos/get-user.dto';
import {GetUserResult} from '../models/results/get-user.result';
import {UpdateUserDto} from '../dtos/update-user.dto';
import {UpdateUserResult} from '../models/results/update-user.result';
import {ValidateFacebookUserDto} from '../dtos/validate-facebook-user.dto';
import {ValidateGoogleUserDto} from '../dtos/validate-google-user.dto';


export abstract class IAuthRepository {
    abstract validateLocalUser(input: ValidateLocalUserDto): Promise<ValidateUserResult>;

    abstract validateFacebookUser(input: ValidateFacebookUserDto): Promise<ValidateUserResult>;

    abstract validateGoogleUser(input: ValidateGoogleUserDto): Promise<ValidateUserResult>;

    abstract login(input: LoginDto): Promise<LoginResult>;

    abstract register(input: RegisterDto): Promise<RegisterResult>;

    abstract sendPasswordResetCode(input: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult>;

    abstract validatePasswordResetCode(input: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult>;

    abstract changePassword(input: ChangePasswordDto): Promise<ChangePasswordResult>;

    abstract confirmEmail(input: ConfirmEmailDto): Promise<ConfirmEmailResult>;

    abstract getUser(input: GetUserDto): Promise<GetUserResult>;

    abstract updateUser(input: UpdateUserDto): Promise<UpdateUserResult>;
}
