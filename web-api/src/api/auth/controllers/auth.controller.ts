import {Body, Controller, Get, Patch, Post, Query, Res} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
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
import {EmailConfirmationDto} from '../../../domain/auth/dtos/email-confirmation.dto';
import {EmailConfirmationResult} from '../../../domain/auth/models/results/email-confirmation.result';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('login')
    async login(@Body() req: LoginDto): Promise<LoginResult> {
        return await this.authService.login(req);
    }

    @Post('registration')
    async registration(@Body() req: RegisterDto): Promise<RegisterResult> {
        return await this.authService.register(req);
    }

    @Post('passwordResetCode')
    async passwordResetCode(@Body() req: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        return await this.authService.sendPasswordResetCode(req);
    }

    @Post('passwordResetCodeValidation')
    async passwordResetCodeValidation(@Body() req: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        return await this.authService.validatePasswordResetCode(req);
    }

    @Patch('passwordReset')
    async passwordReset(@Body() req: ChangePasswordDto): Promise<ChangePasswordResult> {
        return await this.authService.changePassword(req);
    }

    @Get('confirm')
    async confirm(@Query() req: EmailConfirmationDto, @Res() res): Promise<EmailConfirmationResult> {
        return res.redirect(`${process.env.APP_URL}/#/confirm/${req.token}/token`);
    }

    @Patch('confirm')
    async confirmEmail(@Body() req: EmailConfirmationDto): Promise<EmailConfirmationResult> {
        return await this.authService.confirmEmail(req);
    }
}
