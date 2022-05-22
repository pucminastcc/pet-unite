import {Body, Controller, Get, Patch, Put, Query, Request, UseGuards} from '@nestjs/common';
import {DonationService} from '../services/donation.service';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {GetDonationsDto} from '../../../domain/donation/dtos/get-donations.dto';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {SignalDonationInput} from '../../../domain/donation/dtos/signal-donation.input';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {ViewDonationDto} from '../../../domain/donation/dtos/view-donation.dto';

@Controller('donation')
export class DonationController {
    constructor(
        private readonly donationService: DonationService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Put('pet')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Colocar animal de estimação para adoção'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async donatePet(@Body() body: DonatePetDto, @Request() req): Promise<DonatePetResult> {
        return await this.donationService.donatePet({
            userId: req.user.id,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter animais de estimação em adoção'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async getDonations(@Query() query: GetDonationsDto, @Request() req): Promise<DonationResult[]> {
        return await this.donationService.getDonations({
            userId: req.user.id,
            ...query
        });
    }

    @UseGuards(JwtAuthGuard)
    @Patch('')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter animais de estimação em adoção'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async signalDonation(@Body() body: SignalDonationInput, @Request() req): Promise<SignalDonationResult> {
        return await this.donationService.signalDonation({
            userId: req.user.id,
            username: req.user.username,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('viewDonation')
    @ApiTags('donations')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter animais de estimação em adoção'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({
        status: 401,
        description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'
    })
    async getDonation(@Query() query: ViewDonationDto, @Request() req): Promise<DonationResult> {
        return await this.donationService.getDonation({
            donationId: query.donationId
        });
    }
}
