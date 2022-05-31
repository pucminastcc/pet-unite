import {DonatePetDto} from '../dtos/donate-pet.dto';
import {DonatePetResult} from '../models/results/donate-pet.result';
import {DonationResult} from '../models/results/donation.result';
import {SignalDonationResult} from '../models/results/signal-donation.result';
import {GetUserDonationsDto} from '../dtos/get-user-donations.dto';
import {GetThirdDonationsDto} from '../dtos/get-third-donations.dto';
import {SignalDonationDto} from '../dtos/signal-donation.dto';
import {DeleteDonationDto} from '../dtos/delete-donation.dto';
import {DeleteDonationResult} from '../models/results/delete-donation.result';
import {GetDonationDto} from '../dtos/get-donation.dto';
import {GetFlaggedDonationsDto} from '../dtos/get-flagged-donations.dto';
import {UpdateDonationStatusResult} from '../models/results/update-donation-status.result';
import {UpdateDonationStatusDto} from '../dtos/update-donation-status.dto';

export abstract class IDonationRepository {
    abstract donatePet(dto: DonatePetDto): Promise<DonatePetResult>;
    abstract getThirdDonations(dto: GetThirdDonationsDto): Promise<DonationResult[]>;
    abstract getUserDonations(dto: GetUserDonationsDto): Promise<DonationResult[]>;
    abstract getFlaggedDonations(dto: GetFlaggedDonationsDto): Promise<DonationResult[]>;
    abstract signalDonation(dto: SignalDonationDto): Promise<SignalDonationResult>;
    abstract updateDonationStatus(dto: UpdateDonationStatusDto): Promise<UpdateDonationStatusResult>;
    abstract deleteDonation(dto: DeleteDonationDto): Promise<DeleteDonationResult>;
    abstract getDonation(dto: GetDonationDto): Promise<DonationResult>;
}
