import {Body, Controller, Get, Patch, Post, Put, Query, Request, Res, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
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
import {LocalAuthGuard} from '../shared/guards/local-auth.guard';
import {JwtAuthGuard} from '../shared/guards/jwt-auth.guard';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<LoginResult> {
        return await this.authService.login(req.user);
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

    @UseGuards(JwtAuthGuard)
    @Put('user')
    async updateUser(@Body() req: UpdateUserDto): Promise<UpdateUserResult> {
        return await this.authService.updateUser(req);
    }
}
