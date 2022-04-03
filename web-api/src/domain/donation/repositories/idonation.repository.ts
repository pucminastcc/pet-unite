import {DonatePetDto} from '../dtos/donate-pet.dto';
import {DonatePetResult} from '../models/results/donate-pet.result';
import {GetDonationsDto} from '../dtos/get-donations.dto';
import {DonationResult} from '../models/results/donation.result';
import {SignalDonationInput} from '../dtos/signal-donation.input';
import {SignalDonationResult} from '../models/results/signal-donation.result';

export abstract class IDonationRepository {
    abstract donatePet(dto: DonatePetDto): Promise<DonatePetResult>;
    abstract getDonations(dto: GetDonationsDto): Promise<DonationResult[]>;
    abstract signalDonation(dto: SignalDonationInput): Promise<SignalDonationResult>;
}
