import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';
import {GetFlaggedDonationsInput} from './inputs/get-flagged-donations.input';
import {DonationResult} from '../models/results/donation.result';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFlaggedDonationsCommand implements Command<GetFlaggedDonationsInput, DonationResult[]> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: GetFlaggedDonationsInput): Observable<DonationResult[]> {
    return this.repos.getFlaggedDonations(params);
  }
}
