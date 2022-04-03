import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {SupportService} from '../services/support.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {SendReportDto} from '../../../domain/support/dtos/send-report.dto';
import {SendReportResult} from '../../../domain/support/models/results/send-report.result';

@Controller('support')
export class SupportController {
    constructor(
        private readonly supportService: SupportService
    ) {
    }

    @Post('')
    @UseGuards(JwtAuthGuard)
    @ApiTags('suporte')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Enviar relatório de suporte'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 500, description: 'Erro do Servidor Interno.'})
    async sendReport(@Body() body: SendReportDto, @Request() req): Promise<SendReportResult> {
        return await this.supportService.sendReport({
            userId: req.user.id,
            username: req.user.username,
            email: req.user.email,
            date: new Date().toLocaleDateString(),
            ...body
        });
    }
}
