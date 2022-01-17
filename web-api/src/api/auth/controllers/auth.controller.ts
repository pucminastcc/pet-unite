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
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {LocalAuthGuard} from '../shared/guards/local-auth.guard';
import {JwtAuthGuard} from '../shared/guards/jwt-auth.guard';
import {FacebookAuthGuard} from '../shared/guards/facebook-auth.guard';
import {ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import {ConfirmEmailDto} from '../../../domain/auth/dtos/confirm-email.dto';
import {ConfirmEmailResult} from '../../../domain/auth/models/results/email-confirmation.result';
import {GetUserResult} from '../../../domain/auth/models/results/get-user.result';

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
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async registration(@Body() req: RegisterDto, @Res() res): Promise<RegisterResult> {
        const result = await this.authService.register(req);
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('confirm')
    @ApiExcludeEndpoint()
    async confirm(@Query() req: ConfirmEmailDto, @Res() res): Promise<ConfirmEmailResult> {
        return res.redirect(`${process.env.APP_URL}/#/confirm/${req.token}/token`);
    }

    @Patch('confirm')
    @ApiExcludeEndpoint()
    async confirmEmail(@Body() req: ConfirmEmailDto): Promise<ConfirmEmailResult> {
        return await this.authService.confirmEmail(req);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiTags('autenticação')
    @ApiOperation({summary: 'Obter token de acesso'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async login(@Body() body: ValidateLocalUserDto, @Request() req, @Res() res): Promise<LoginResult> {
        const result = await this.authService.login(req.user);
        return res.status(HttpStatus.OK).json(result);
    }

    @Post('passwordResetCode')
    @ApiExcludeEndpoint()
    async passwordResetCode(@Body() req: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        return await this.authService.sendPasswordResetCode(req);
    }

    @Post('passwordResetCodeValidation')
    @ApiExcludeEndpoint()
    async passwordResetCodeValidation(@Body() req: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        return await this.authService.validatePasswordResetCode(req);
    }

    @Patch('passwordReset')
    @ApiExcludeEndpoint()
    async passwordReset(@Body() req: ChangePasswordDto): Promise<ChangePasswordResult> {
        return await this.authService.changePassword(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    @ApiTags('autenticação')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter cadastro de usuário autenticado'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getUser(@Request() req): Promise<GetUserResult> {
        return await this.authService.getUser({
            id: req.user.id
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('user')
    @ApiTags('autenticação')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Alterar cadastro de usuário autenticado'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async updateUser(@Body() body: UpdateUserDto, @Request() req): Promise<UpdateUserResult> {
        return await this.authService.updateUser({
            ...body,
            id: req.user.id
        });
    }
}
