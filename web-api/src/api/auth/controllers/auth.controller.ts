import {Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Put, Query, Request, Res, UseGuards} from '@nestjs/common';
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
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {LocalAuthGuard} from '../shared/guards/local-auth.guard';
import {JwtAuthGuard} from '../shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import {ConfirmEmailDto} from '../../../domain/auth/dtos/confirm-email.dto';
import {ConfirmEmailResult} from '../../../domain/auth/models/results/email-confirmation.result';
import {GetUserResult} from '../../../domain/auth/models/results/get-user.result';
import {ValidateFacebookUserDto} from '../../../domain/auth/dtos/validate-facebook-user.dto';
import {ValidateGoogleUserDto} from '../../../domain/auth/dtos/validate-google-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('registration')
    @HttpCode(HttpStatus.CREATED)
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Criar cadastro de usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 201, description: 'Resposta de sucesso, indica que a requisição foi bem sucedida e que um novo recurso foi criado.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async registration(@Body() body: RegisterDto): Promise<RegisterResult> {
        return await this.authService.register(body);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Obter token de acesso'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async login(@Body() body: ValidateLocalUserDto, @Request() req): Promise<LoginResult> {
        return await this.authService.login(req.user);
    }

    @Post('facebook')
    @ApiExcludeEndpoint()
    async facebook(@Body() body: ValidateFacebookUserDto): Promise<LoginResult> {
        const user = await this.authService.validateFacebookUser(body);
        return await this.authService.login(user);
    }

    @Post('google')
    @ApiExcludeEndpoint()
    async google(@Body() body: ValidateGoogleUserDto): Promise<LoginResult> {
        const user = await this.authService.validateGoogleUser(body);
        return await this.authService.login(user);
    }

    @Get('confirm')
    @ApiExcludeEndpoint()
    async confirm(@Query() query: ConfirmEmailDto, @Res() res): Promise<ConfirmEmailResult> {
        return res.redirect(`${process.env.APP_URL}/#/confirm/${query.token}/token`);
    }

    @Patch('confirm')
    @ApiExcludeEndpoint()
    async confirmEmail(@Body() body: ConfirmEmailDto): Promise<ConfirmEmailResult> {
        return await this.authService.confirmEmail(body);
    }

    @Post('passwordResetCode')
    @ApiExcludeEndpoint()
    async passwordResetCode(@Body() body: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        return await this.authService.sendPasswordResetCode(body);
    }

    @Post('passwordResetCodeValidation')
    @ApiExcludeEndpoint()
    async passwordResetCodeValidation(@Body() body: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        return await this.authService.validatePasswordResetCode(body);
    }

    @Patch('passwordReset')
    @ApiExcludeEndpoint()
    async passwordReset(@Body() body: ChangePasswordDto): Promise<ChangePasswordResult> {
        return await this.authService.changePassword(body);
    }

    @Get('user')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Obter cadastro de usuário autenticado'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino.'})
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getUser(@Request() req): Promise<GetUserResult> {
        return await this.authService.getUser({
            id: req.user.id
        });
    }

    @Put('user')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Alterar cadastro de usuário autenticado'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino.'})
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async updateUser(@Body() body: UpdateUserDto, @Request() req): Promise<UpdateUserResult> {
        return await this.authService.updateUser({
            ...body,
            id: req.user.id
        });
    }
}
