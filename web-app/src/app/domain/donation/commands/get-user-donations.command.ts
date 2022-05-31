import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DonationResult} from '../models/results/donation.result';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';
import {Observable} from 'rxjs';
import {GetUserDonationsInput} from './inputs/get-user-donations.input';

@Injectable({
  providedIn: 'root'
})
export class GetUserDonationsCommand implements Command<GetUserDonationsInput, DonationResult[]> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: GetUserDonationsInput): Observable<DonationResult[]> {
    return this.repos.getUserDonations(params);
  }
}
