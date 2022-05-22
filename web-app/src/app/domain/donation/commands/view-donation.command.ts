import {Command} from '../../../core/base/command';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';
import {ViewDonationInput} from './inputs/view-donation.input';
import {DonationResult} from '../models/results/donation.result';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewDonationCommand implements Command<ViewDonationInput, DonationResult>{
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: ViewDonationInput): Observable<DonationResult> {
    return this.repos.viewDonation(params);
  }
}
