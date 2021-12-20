import {Body, Controller, Get, HttpStatus, Patch, Post, Put, Query, Req, Request, Res, UseGuards} from '@nestjs/common';
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
import {EmailConfirmationResult} from '../../../domain/auth/models/results/email-confirmation.result';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {LocalAuthGuard} from '../shared/guards/local-auth.guard';
import {JwtAuthGuard} from '../shared/guards/jwt-auth.guard';
import {FacebookAuthGuard} from '../shared/guards/facebook-auth.guard';
import {ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import {ConfirmEmailDto} from '../../../domain/auth/dtos/confirm-email.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @UseGuards(FacebookAuthGuard)
    @Get('facebook')
    @ApiExcludeEndpoint()
    async facebook(): Promise<any> {
        return HttpStatus.OK;
    }

    @UseGuards(FacebookAuthGuard)
    @Get('facebook/redirect')
    @ApiExcludeEndpoint()
    async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
        const result = await this.authService.login(req.user);
        res.cookie('facebook', result);

        return res.redirect(`${process.env.APP_URL}`);
    }

    @Post('registration')
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Criar cadastro de usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async registration(@Body() req: RegisterDto, @Res() res): Promise<RegisterResult> {
        const result = await this.authService.register(req);
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('confirm')
    @ApiExcludeEndpoint()
    async confirm(@Query() req: ConfirmEmailDto, @Res() res): Promise<EmailConfirmationResult> {
        return res.redirect(`${process.env.APP_URL}/#/confirm/${req.token}/token`);
    }

    @Patch('confirm')
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Confirmar email cadastrado'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async confirmEmail(@Body() req: ConfirmEmailDto): Promise<EmailConfirmationResult> {
        return await this.authService.confirmEmail(req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Login de usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async login(@Body() body: ValidateLocalUserDto, @Request() req, @Res() res): Promise<LoginResult> {
        const result = await this.authService.login(req.user);
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('passwordResetCode')
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Enviar código para recuperação da conta'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async passwordResetCode(@Body() req: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        return await this.authService.sendPasswordResetCode(req);
    }

    @Post('passwordResetCodeValidation')
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Validar código de recuperação da conta'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async passwordResetCodeValidation(@Body() req: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        return await this.authService.validatePasswordResetCode(req);
    }

    @Patch('passwordReset')
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Alterar senha'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async passwordReset(@Body() req: ChangePasswordDto): Promise<ChangePasswordResult> {
        return await this.authService.changePassword(req);
    }

    @UseGuards(JwtAuthGuard)
    @Put('user')
    @ApiTags('autenticação')
    @ApiBearerAuth('Bearer')
    @ApiOperation({summary: 'Alterar cadastro de usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async updateUser(@Body() req: UpdateUserDto): Promise<UpdateUserResult> {
        return await this.authService.updateUser(req);
    }
}
