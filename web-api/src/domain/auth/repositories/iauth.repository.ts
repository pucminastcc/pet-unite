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

export abstract class IAuthRepository {
    abstract login(input: LoginDto): Promise<LoginResult>;

    abstract register(input: RegisterDto): Promise<RegisterResult>;

    abstract sendPasswordResetCode(input: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult>;

    abstract validatePasswordResetCode(input: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult>;

    abstract changePassword(input: ChangePasswordDto): Promise<ChangePasswordResult>;
}
