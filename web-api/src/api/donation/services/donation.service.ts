import {Injectable} from '@nestjs/common';
import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {DonationRepository} from '../../../infra/donation/repositories/donation.repository';
import {GetDonationsDto} from '../../../domain/donation/dtos/get-donations.dto';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {SignalDonationInput} from '../../../domain/donation/dtos/signal-donation.input';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {ViewDonationDto} from '../../../domain/donation/dtos/view-donation.dto';

@Injectable()
export class DonationService implements IDonationRepository {
    constructor(
        private readonly repository: DonationRepository
    ) {
    }

    async donatePet(dto: DonatePetDto): Promise<DonatePetResult> {
        return await this.repository.donatePet(dto);
    }

    async getDonations(dto: GetDonationsDto): Promise<DonationResult[]> {
        return await this.repository.getDonations(dto);
    }

    async signalDonation(dto: SignalDonationInput): Promise<SignalDonationResult> {
        return await this.repository.signalDonation(dto);
    }

    async getDonation(dto: ViewDonationDto): Promise<DonationResult> {
        return await this.repository.getDonation(dto);
    }
}
