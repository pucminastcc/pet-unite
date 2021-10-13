import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {LoginDto} from '../../domain/auth/models/dtos/login.dto';
import {RegisterDto} from '../../domain/auth/models/dtos/register.dto';
import {AccountActivationDto} from '../../domain/auth/models/dtos/account-activation.dto';
import {SendPasswordRecoveryDto} from '../../domain/auth/models/dtos/send-password-recovery.dto';
import {LoginResult} from '../../domain/auth/models/results/login.result';
import {RegisterResult} from '../../domain/auth/models/results/register.result';
import {AccountActivationResult} from '../../domain/auth/models/results/account-activation.result';
import {SendPasswordRecoveryResult} from '../../domain/auth/models/results/send-password-recovery.result';
import {AuthService} from './services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) {
    }

    @Post('login')
    async login(@Body() input: LoginDto): Promise<LoginResult> {
        return this.service.login(input);
    }

    @Post('registration')
    async register(@Body() input: RegisterDto): Promise<RegisterResult> {
        console.log(input);
        return;
    }

    @Post('passwordRecovery')
    async sendPasswordRecovery(@Body() input: SendPasswordRecoveryDto): Promise<SendPasswordRecoveryResult> {
        console.log(input);
        return;
    }

    @Get('passwordRecovery')
    async passwordRecoveryView(@Body() input: any): Promise<any> {
        return;
    }

    @Put('passwordRecovery')
    async recoveryPassword(@Body() input: any): Promise<any> {
        return;
    }

    @Get('accountActivation')
    async accountActivationView(@Body() input: AccountActivationDto): Promise<AccountActivationResult> {
        return;
    }

    @Put('accountActivation')
    async activateAccount(@Body() input: any): Promise<any> {
        console.log(input);
        return;
    }

    @Get('facebookLogin')
    async facebookLogin(@Param() input: any): Promise<any> {
        return;
    }
}
