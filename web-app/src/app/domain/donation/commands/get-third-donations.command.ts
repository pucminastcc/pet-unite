import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetThirdDonationsInput} from './inputs/get-third-donations.input';
import {DonationResult} from '../models/results/donation.result';
import {Observable} from 'rxjs';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';

@Injectable({
  providedIn: 'root'
})
export class GetThirdDonationsCommand implements Command<GetThirdDonationsInput, DonationResult[]> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: GetThirdDonationsInput): Observable<DonationResult[]> {
    return this.repos.getThirdDonations(params);
  }
}
