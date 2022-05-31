import {Command} from '../../../core/base/command';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';
import {DonationResult} from '../models/results/donation.result';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {GetDonationInput} from './inputs/get-donation.input';

@Injectable({
  providedIn: 'root'
})
export class GetDonationCommand implements Command<GetDonationInput, DonationResult>{
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: GetDonationInput): Observable<DonationResult> {
    return this.repos.getDonation(params);
  }
}
