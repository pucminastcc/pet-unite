import {Observable} from 'rxjs';
import {DonatePetInput} from '../commands/inputs/donate-pet.input';
import {DonatePetResult} from '../models/results/donate-pet.result';
import {DonationResult} from '../models/results/donation.result';
import {SignalDonationInput} from '../commands/inputs/signal-donation.input';
import {SignalDonationResult} from '../models/results/signal-donation.result';
import {GetUserDonationsInput} from '../commands/inputs/get-user-donations.input';
import {GetThirdDonationsInput} from '../commands/inputs/get-third-donations.input';
import {DeleteDonationInput} from '../commands/inputs/delete-donation.input';
import {DeleteDonationResult} from '../models/results/delete-donation.result';
import {GetDonationInput} from '../commands/inputs/get-donation.input';
import {GetFlaggedDonationsInput} from '../commands/inputs/get-flagged-donations.input';
import {UpdateDonationStatusInput} from '../commands/inputs/update-donation-status.input';
import {UpdateDonationStatusResult} from '../models/results/update-donation-status.result';

export abstract class IDonationRepository {
  abstract donatePet(input: DonatePetInput): Observable<DonatePetResult>;
  abstract getThirdDonations(input: GetThirdDonationsInput): Observable<DonationResult[]>;
  abstract getUserDonations(input: GetUserDonationsInput): Observable<DonationResult[]>;
  abstract getFlaggedDonations(input: GetFlaggedDonationsInput): Observable<DonationResult[]>;
  abstract signalDonation(input: SignalDonationInput): Observable<SignalDonationResult>;
  abstract updateDonationStatus(input: UpdateDonationStatusInput): Observable<UpdateDonationStatusResult>;
  abstract deleteDonation(input: DeleteDonationInput): Observable<DeleteDonationResult>;
  abstract getDonation(input: GetDonationInput): Observable<DonationResult>;
}
