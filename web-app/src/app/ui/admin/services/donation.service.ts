import {Injectable} from '@angular/core';
import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {AuthService} from '../../auth/services/auth.service';
import {Observable} from 'rxjs';
import {DonatePetInput} from '../../../domain/donation/commands/inputs/donate-pet.input';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {DonatePetCommand} from '../../../domain/donation/commands/donate-pet.command';
import {GetDonationsInput} from '../../../domain/donation/commands/inputs/get-donations.input';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {GetDonationsCommand} from '../../../domain/donation/commands/get-donations.command';
import {SignalDonationCommand} from '../../../domain/donation/commands/signal-donation.command';
import {SignalDonationInput} from '../../../domain/donation/commands/inputs/signal-donation.input';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {ViewDonationCommand} from '../../../domain/donation/commands/view-donation.command';
import {ViewDonationInput} from '../../../domain/donation/commands/inputs/view-donation.input';

@Injectable({
  providedIn: 'root'
})
export class DonationService implements IDonationRepository {

  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly donatePetCommand: DonatePetCommand,
    private readonly getDonationsCommand: GetDonationsCommand,
    private readonly signalDonationCommand: SignalDonationCommand,
    private readonly viewDonationCommand: ViewDonationCommand
  ) {
    this.accessToken = this.authService.getToken();
  }

  donatePet(input: DonatePetInput): Observable<DonatePetResult> {
    return this.donatePetCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getDonations(input?: GetDonationsInput): Observable<DonationResult[]> {
    return this.getDonationsCommand.execute({
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

  viewDonation(input: ViewDonationInput): Observable<DonationResult> {
    return this.viewDonationCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
