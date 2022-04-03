import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetDonationsInput} from './inputs/get-donations.input';
import {DonationResult} from '../models/results/donation.result';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDonationsCommand implements Command<GetDonationsInput, DonationResult[]> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: GetDonationsInput): Observable<DonationResult[]> {
    return this.repos.getDonations(params);
  }
}
