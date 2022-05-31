import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DeleteDonationInput} from './inputs/delete-donation.input';
import {DeleteDonationResult} from '../models/results/delete-donation.result';
import {Observable} from 'rxjs';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';

@Injectable({
  providedIn: 'root'
})
export class DeleteDonationCommand implements Command<DeleteDonationInput, DeleteDonationResult> {
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: DeleteDonationInput): Observable<DeleteDonationResult> {
    return this.repos.deleteDonation(params);
  }
}
