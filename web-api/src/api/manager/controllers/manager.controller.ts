import {Body, Controller, Delete, Get, Put, Query, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {ManagerService} from '../services/manager.service';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetUsersDto} from '../../../domain/manager/dtos/get-users.dto';
import {UserBaseResult} from '../../../domain/manager/models/results/user-base.result';
import {DeleteUserResult} from '../../../domain/manager/models/results/delete-user.result';
import {DeleteUserDto} from '../../../domain/manager/dtos/delete-user.dto';
import {GetUserAccountDto} from '../../../domain/manager/dtos/get-user-account.dto';
import {UserAccountResult} from '../../../domain/manager/models/results/user-account.result';
import {GetReportsDto} from '../../../domain/manager/dtos/get-reports.dto';
import {ReportBaseResult} from '../../../domain/manager/models/results/report-base.result';
import {GetReportDto} from '../../../domain/manager/dtos/get-report.dto';
import {ReportResult} from '../../../domain/manager/models/results/report.result';
import {GetPermissionRequestsDto} from '../../../domain/manager/dtos/get-permission-requests.dto';
import {ReplyPermissionRequestDto} from '../../../domain/manager/dtos/reply-permission-request.dto';
import {ReplyPermissionRequestResult} from '../../../domain/manager/models/results/reply-permission-request.result';
import {PermissionRequestBaseResult} from '../../../domain/manager/models/results/permission-request-base.result';

@Controller('manager')
export class ManagerController {
    constructor(
        private readonly managerService: ManagerService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('users')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter cadastros de usuários'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getUsers(@Query() query: GetUsersDto, @Request() req): Promise<UserBaseResult[]> {
        return await this.managerService.getUsers({
            ...query,
            id: req.user.id
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('user')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Deletar cadastro de usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async deleteUser(@Query() query: DeleteUserDto, @Request() req): Promise<DeleteUserResult> {
        if (!req.user.isSuperUser) {
            throw new UnauthorizedException();
        }
        return await this.managerService.deleteUser({
            id: query.id
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter conta do usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getUserAccount(@Query() query: GetUserAccountDto, @Request() req): Promise<UserAccountResult> {
        return await this.managerService.getUserAccount({
            id: query.id
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('reports')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter listagem de relatórios dos usuários'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getReports(@Query() query: GetReportsDto, @Request() req): Promise<ReportBaseResult[]> {
        if (!req.user.isSuperUser) {
            throw new UnauthorizedException();
        }
        return await this.managerService.getReports(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('report')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter relatório detalhado do usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getReport(@Query() query: GetReportDto, @Request() req): Promise<ReportResult> {
        if (!req.user.isSuperUser) {
            throw new UnauthorizedException();
        }
        return await this.managerService.getReport(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('requests')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter solicitações de permissão para as instituições'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async getPermissionRequests(@Query() query: GetPermissionRequestsDto, @Request() req): Promise<PermissionRequestBaseResult[]> {
        if (!req.user.isSuperUser) {
            throw new UnauthorizedException();
        }
        return await this.managerService.getPermissionRequests(query);
    }

    @UseGuards(JwtAuthGuard)
    @Put('requests')
    @ApiTags('gerenciador')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Responder solicitação de permissão para a instituição'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async replyPermissionRequest(@Body() body: ReplyPermissionRequestDto, @Request() req): Promise<ReplyPermissionRequestResult> {
        if (!req.user.isSuperUser) {
            throw new UnauthorizedException();
        }
        return await this.managerService.replyPermissionRequest(body);
    }
}
