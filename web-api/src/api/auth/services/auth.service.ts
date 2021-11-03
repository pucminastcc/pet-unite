import {Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {AuthRepository} from '../../../infra/auth/repositories/auth.repository';
import {LoginDto} from '../../../domain/auth/dtos/login.dto';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {RegisterDto} from '../../../domain/auth/dtos/register.dto';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {SendPasswordResetCodeDto} from '../../../domain/auth/dtos/send-password-reset-code.dto';
import {SendPasswordResetCodeResult} from '../../../domain/auth/models/results/send-password-reset-code.result';
import {ValidatePasswordResetCodeDto} from '../../../domain/auth/dtos/validate-password-reset-code.dto';
import {ValidatePasswordResetCodeResult} from '../../../domain/auth/models/results/validate-password-reset-code.result';
import {ChangePasswordDto} from '../../../domain/auth/dtos/change-password.dto';
import {ChangePasswordResult} from '../../../domain/auth/models/results/change-password.result';
import { EmailConfirmationDto } from 'src/domain/auth/dtos/email-confirmation.dto';
import { EmailConfirmationResult } from 'src/domain/auth/models/results/email-confirmation.result';
import {ValidateUserDto} from '../../../domain/auth/dtos/validate-user.dto';
import {ValidateUserResult} from '../../../domain/auth/models/results/validate-user.result';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';

@Injectable()
export class AuthService implements IAuthRepository {
    constructor(
        private readonly repository: AuthRepository
    ) {
    }

    async validateUser(input: ValidateUserDto): Promise<ValidateUserResult> {
        return await this.repository.validateUser(input);
    }

    async login(input: LoginDto): Promise<LoginResult> {
        return await this.repository.login(input);
    }

    async register(input: RegisterDto): Promise<RegisterResult> {
        return await this.repository.register(input);
    }

    async sendPasswordResetCode(input: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        return await this.repository.sendPasswordResetCode(input);
    }

    async validatePasswordResetCode(input: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        return await this.repository.validatePasswordResetCode(input);
    }

    async changePassword(input: ChangePasswordDto): Promise<ChangePasswordResult> {
        return await this.repository.changePassword(input);
    }

    async confirmEmail(input: EmailConfirmationDto): Promise<EmailConfirmationResult> {
        return await this.repository.confirmEmail(input);
    }

    async updateUser(input: UpdateUserDto): Promise<UpdateUserResult> {
        return await this.repository.updateUser(input);
    }
}
