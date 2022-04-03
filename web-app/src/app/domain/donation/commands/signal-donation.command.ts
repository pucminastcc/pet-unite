import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {SignalDonationInput} from './inputs/signal-donation.input';
import {SignalDonationResult} from '../models/results/signal-donation.result';
import {Observable} from 'rxjs';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';

@Injectable({
  providedIn: 'root'
})
export class SignalDonationCommand implements Command<SignalDonationInput, SignalDonationResult> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: SignalDonationInput): Observable<SignalDonationResult> {
    return this.repos.signalDonation(params);
  }
}
