import {Body, Controller, Get, Query, UseGuards} from '@nestjs/common';
import {ConfigService} from '../services/config.service';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';
import {GetPetGendersDto} from '../../../domain/config/dtos/get-pet-genders.dto';
import {PetGenderResult} from '../../../domain/config/models/results/pet-gender.result';
import {GetStatesDto} from '../../../domain/config/dtos/get-states.dto';
import {BrazilStateResult} from '../../../domain/config/models/results/brazil-state.result';

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
    async getPersonTypes(@Query() query: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        return await this.configService.getPersonTypes(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('petGenders')
    @ApiTags('configuração')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter tipos de pessoas'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async getPetGenders(@Query() query: GetPetGendersDto): Promise<PetGenderResult[]> {
        return await this.configService.getPetGenders(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('states')
    @ApiTags('configuração')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter Estados do Brasil'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    async getStates(@Query() query: GetStatesDto): Promise<BrazilStateResult[]> {
        return await this.configService.getStates(query);
    }
}
