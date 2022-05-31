import {Injectable} from '@nestjs/common';
import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {DonationRepository} from '../../../infra/donation/repositories/donation.repository';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {GetThirdDonationsDto} from 'src/domain/donation/dtos/get-third-donations.dto';
import {GetUserDonationsDto} from '../../../domain/donation/dtos/get-user-donations.dto';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {SignalDonationDto} from '../../../domain/donation/dtos/signal-donation.dto';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {DeleteDonationDto} from '../../../domain/donation/dtos/delete-donation.dto';
import {DeleteDonationResult} from '../../../domain/donation/models/results/delete-donation.result';
import {GetDonationDto} from '../../../domain/donation/dtos/get-donation.dto';
import { GetFlaggedDonationsDto } from 'src/domain/donation/dtos/get-flagged-donations.dto';
import {UpdateDonationStatusDto} from '../../../domain/donation/dtos/update-donation-status.dto';
import {UpdateDonationStatusResult} from '../../../domain/donation/models/results/update-donation-status.result';

@Injectable()
export class DonationService implements IDonationRepository {
    constructor(
        private readonly repository: DonationRepository
    ) {
    }

    async donatePet(dto: DonatePetDto): Promise<DonatePetResult> {
        return await this.repository.donatePet(dto);
    }

    async getThirdDonations(dto: GetThirdDonationsDto): Promise<DonationResult[]> {
        return await this.repository.getThirdDonations(dto);
    }

    async getUserDonations(dto: GetUserDonationsDto): Promise<DonationResult[]> {
        return await this.repository.getUserDonations(dto);
    }

    async getFlaggedDonations(dto: GetFlaggedDonationsDto): Promise<DonationResult[]> {
        return await this.repository.getFlaggedDonations(dto);
    }

    async signalDonation(dto: SignalDonationDto): Promise<SignalDonationResult> {
        return await this.repository.signalDonation(dto);
    }

    async updateDonationStatus(dto: UpdateDonationStatusDto): Promise<UpdateDonationStatusResult> {
        return await this.repository.updateDonationStatus(dto);
    }

    async deleteDonation(dto: DeleteDonationDto): Promise<DeleteDonationResult> {
        return await this.repository.deleteDonation(dto);
    }

    async getDonation(dto: GetDonationDto): Promise<DonationResult> {
        return await this.repository.getDonation(dto);
    }
}
