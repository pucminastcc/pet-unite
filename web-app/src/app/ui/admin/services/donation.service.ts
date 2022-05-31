import {Injectable} from '@angular/core';
import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {AuthService} from '../../auth/services/auth.service';
import {Observable} from 'rxjs';
import {DonatePetInput} from '../../../domain/donation/commands/inputs/donate-pet.input';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {DonatePetCommand} from '../../../domain/donation/commands/donate-pet.command';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {SignalDonationCommand} from '../../../domain/donation/commands/signal-donation.command';
import {SignalDonationInput} from '../../../domain/donation/commands/inputs/signal-donation.input';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {GetUserDonationsCommand} from '../../../domain/donation/commands/get-user-donations.command';
import {GetThirdDonationsInput} from '../../../domain/donation/commands/inputs/get-third-donations.input';
import {GetThirdDonationsCommand} from '../../../domain/donation/commands/get-third-donations.command';
import {GetUserDonationsInput} from '../../../domain/donation/commands/inputs/get-user-donations.input';
import {DeleteDonationInput} from '../../../domain/donation/commands/inputs/delete-donation.input';
import {DeleteDonationResult} from '../../../domain/donation/models/results/delete-donation.result';
import {DeleteDonationCommand} from '../../../domain/donation/commands/delete-donation.command';
import {GetDonationCommand} from '../../../domain/donation/commands/get-donation.command';
import {GetDonationInput} from '../../../domain/donation/commands/inputs/get-donation.input';
import {GetFlaggedDonationsInput} from '../../../domain/donation/commands/inputs/get-flagged-donations.input';
import {GetFlaggedDonationsCommand} from '../../../domain/donation/commands/get-flagged-donations.command';
import {UpdateDonationStatusInput} from '../../../domain/donation/commands/inputs/update-donation-status.input';
import {UpdateDonationStatusResult} from '../../../domain/donation/models/results/update-donation-status.result';
import {UpdateDonationStatusCommand} from '../../../domain/donation/commands/update-donation-status.command';

@Injectable({
  providedIn: 'root'
})
export class DonationService implements IDonationRepository {

  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly donatePetCommand: DonatePetCommand,
    private readonly getThirdDonationsCommand: GetThirdDonationsCommand,
    private readonly getUserDonationsCommand: GetUserDonationsCommand,
    private readonly getFlaggedDonationsCommand: GetFlaggedDonationsCommand,
    private readonly signalDonationCommand: SignalDonationCommand,
    private readonly updateDonationStatusCommand: UpdateDonationStatusCommand,
    private readonly deleteDonationCommand: DeleteDonationCommand,
    private readonly getDonationCommand: GetDonationCommand
  ) {
    this.accessToken = this.authService.getToken();
  }

  donatePet(input: DonatePetInput): Observable<DonatePetResult> {
    return this.donatePetCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getThirdDonations(input?: GetThirdDonationsInput): Observable<DonationResult[]> {
    return this.getThirdDonationsCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getFlaggedDonations(input?: GetFlaggedDonationsInput): Observable<DonationResult[]> {
    return this.getFlaggedDonationsCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getUserDonations(input?: GetUserDonationsInput): Observable<DonationResult[]> {
    return this.getUserDonationsCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  updateDonationStatus(input: UpdateDonationStatusInput): Observable<UpdateDonationStatusResult> {
    return this.updateDonationStatusCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  signalDonation(input: SignalDonationInput): Observable<SignalDonationResult> {
    return this.signalDonationCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  deleteDonation(input: DeleteDonationInput): Observable<DeleteDonationResult> {
    return this.deleteDonationCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getDonation(input: GetDonationInput): Observable<DonationResult> {
    return this.getDonationCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
