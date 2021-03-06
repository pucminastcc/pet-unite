import {Body, Controller, Delete, Get, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import {PetService} from '../services/pet.service';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreatePetDto} from '../../../domain/pet/dtos/create-pet.dto';
import {CreatePetResult} from '../../../domain/pet/models/results/create-pet.result';
import {UpdatePetDto} from '../../../domain/pet/dtos/update-pet.dto';
import {UpdatePetResult} from '../../../domain/pet/models/results/update-pet.result';
import {DeletePetDto} from '../../../domain/pet/dtos/delete-pet.dto';
import {DeletePetResult} from '../../../domain/pet/models/results/delete-pet.result';
import {GetPetDto} from '../../../domain/pet/dtos/get-pet.dto';
import {GetPetResult} from '../../../domain/pet/models/results/get-pet.result';
import {GetPetsDto} from '../../../domain/pet/dtos/get-pets.dto';
import {PetBaseResult} from '../../../domain/pet/models/results/pet-base.result';

@Controller('pet')
export class PetController {
    constructor(
        private readonly petService: PetService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    @ApiTags('pet')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter todos os cadastros dos animais de estimação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async getPets(@Query() query: GetPetsDto, @Request() req): Promise<PetBaseResult[]> {
        return await this.petService.getPets({
            userId: req.user.id
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('detail')
    @ApiTags('pet')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter cadastro do animal de estimação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async getPet(@Query() query: GetPetDto, @Request() req): Promise<GetPetResult> {
        return await this.petService.getPet({
            userId: req.user.id,
            id: query.id
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiTags('pet')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Cadastrar animal de estimação'})
    @ApiResponse({status: 201, description: 'Recurso criado no servidor.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async createPet(@Body() body: CreatePetDto, @Request() req): Promise<CreatePetResult> {
        return await this.petService.createPet({
            userId: req.user.id,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiTags('pet')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Alterar cadastro do animal de estimação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async updatePet(@Body() body: UpdatePetDto, @Request() req): Promise<UpdatePetResult> {
        return await this.petService.updatePet({
            userId: req.user.id,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    @ApiTags('pet')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Deletar cadastro do animal de estimação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async deletePet(@Query() query: DeletePetDto, @Request() req): Promise<DeletePetResult> {
        return await this.petService.deletePet({
            userId: req.user.id,
            ...query
        });
    }
}
