import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {Observable} from 'rxjs';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';
import {UpdateDonationStatusInput} from './inputs/update-donation-status.input';
import {UpdateDonationStatusResult} from '../models/results/update-donation-status.result';

@Injectable({
  providedIn: 'root'
})
export class UpdateDonationStatusCommand implements Command<UpdateDonationStatusInput, UpdateDonationStatusResult> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: UpdateDonationStatusInput): Observable<UpdateDonationStatusResult> {
    return this.repos.updateDonationStatus(params);
  }
}
