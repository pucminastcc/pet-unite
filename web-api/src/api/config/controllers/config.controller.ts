import {Body, Controller, Get, UseGuards} from '@nestjs/common';
import {ConfigService} from '../services/config.service';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';

@Controller('config')
export class ConfigController {
    constructor(
        private readonly configService: ConfigService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('personTypes')
    @ApiTags('configuração')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter tipos de pessoas'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async getPersonTypes(@Body() req: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        return await this.configService.getPersonTypes(req);
    }
}
