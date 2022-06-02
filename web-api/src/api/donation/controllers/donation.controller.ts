import {Body, Controller, Delete, Get, Patch, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import {DonationService} from '../services/donation.service';
import {JwtAuthGuard} from '../../auth/shared/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {GetUserDonationsDto} from '../../../domain/donation/dtos/get-user-donations.dto';
import {GetThirdDonationsDto} from '../../../domain/donation/dtos/get-third-donations.dto';
import {SignalDonationDto} from '../../../domain/donation/dtos/signal-donation.dto';
import {DeleteDonationDto} from '../../../domain/donation/dtos/delete-donation.dto';
import {DeleteDonationResult} from '../../../domain/donation/models/results/delete-donation.result';
import {GetDonationDto} from '../../../domain/donation/dtos/get-donation.dto';
import {GetFlaggedDonationsDto} from '../../../domain/donation/dtos/get-flagged-donations.dto';
import {UpdateDonationStatusResult} from '../../../domain/donation/models/results/update-donation-status.result';
import {UpdateDonationStatusDto} from '../../../domain/donation/dtos/update-donation-status.dto';

@Controller('donation')
export class DonationController {
    constructor(
        private readonly donationService: DonationService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('pet')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Postar doação do animal de estimação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async donatePet(@Body() body: DonatePetDto, @Request() req): Promise<DonatePetResult> {
        return await this.donationService.donatePet({
            userId: req.user.id,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('third')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter postagens de doações'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async getThirdDonations(@Query() query: GetThirdDonationsDto, @Request() req): Promise<DonationResult[]> {
        return await this.donationService.getThirdDonations({
            userId: req.user.id,
            ...query
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter doações do usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async getUserDonations(@Query() query: GetUserDonationsDto, @Request() req): Promise<DonationResult[]> {
        return await this.donationService.getUserDonations({
            userId: req.user.id,
            ...query
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('flagged')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter doações sinalizadas do usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async getFlaggedDonations(@Query() query: GetFlaggedDonationsDto, @Request() req): Promise<DonationResult[]> {
        return await this.donationService.getFlaggedDonations({
            userId: req.user.id,
            ...query
        });
    }

    @UseGuards(JwtAuthGuard)
    @Patch('signal')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Sinalizar interesse pela doação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async signalDonation(@Body() body: SignalDonationDto, @Request() req): Promise<SignalDonationResult> {
        return await this.donationService.signalDonation({
            userId: req.user.id,
            username: req.user.username,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put('status')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Alterar status da doação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async updateDonationStatus(@Body() body: UpdateDonationStatusDto, @Request() req): Promise<UpdateDonationStatusResult> {
        return await this.donationService.updateDonationStatus({
            userId: req.user.id,
            username: req.user.username,
            ...body
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('user')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Excluir doação do usuário'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async deleteDonation(@Query() query: DeleteDonationDto, @Request() req): Promise<DeleteDonationResult> {
        return await this.donationService.deleteDonation({
            userId: req.user.id,
            ...query
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('detail')
    @ApiTags('donation')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Obter cadastro de doação'})
    @ApiResponse({status: 200, description: 'Resposta padrão para solicitação HTTP bem-sucedida.'})
    @ApiResponse({status: 400, description: 'A solicitação não pode ser atendida devido a sintaxe incorreta.'})
    @ApiResponse({status: 401, description: 'A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino'})
    async getDonation(@Query() query: GetDonationDto): Promise<DonationResult> {
        return await this.donationService.getDonation({
            donationId: query.donationId
        });
    }
}
