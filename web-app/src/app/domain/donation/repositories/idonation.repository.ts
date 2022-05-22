import {Observable} from 'rxjs';
import {DonatePetInput} from '../commands/inputs/donate-pet.input';
import {DonatePetResult} from '../models/results/donate-pet.result';
import {GetDonationsInput} from '../commands/inputs/get-donations.input';
import {DonationResult} from '../models/results/donation.result';
import {SignalDonationInput} from '../commands/inputs/signal-donation.input';
import {SignalDonationResult} from '../models/results/signal-donation.result';
import {ViewDonationInput} from '../commands/inputs/view-donation.input';

export abstract class IDonationRepository {
  abstract donatePet(input: DonatePetInput): Observable<DonatePetResult>;
  abstract getDonations(input: GetDonationsInput): Observable<DonationResult[]>;
  abstract signalDonation(input: SignalDonationInput): Observable<SignalDonationResult>;
  abstract viewDonation(input: ViewDonationInput): Observable<DonationResult>;
}
