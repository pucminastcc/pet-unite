import {Injectable} from '@angular/core';
import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {ApiDatasource} from '../../datasources/api.datasource';
import {Observable} from 'rxjs';
import {DonatePetInput} from '../../../domain/donation/commands/inputs/donate-pet.input';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {GetDonationsInput} from '../../../domain/donation/commands/inputs/get-donations.input';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import { SignalDonationInput } from 'src/app/domain/donation/commands/inputs/signal-donation.input';
import { SignalDonationResult } from 'src/app/domain/donation/models/results/signal-donation.result';

@Injectable({
  providedIn: 'root'
})
export class DonationRepository extends IDonationRepository {
  constructor(
    private readonly api: ApiDatasource
  ) {
    super();
  }

  donatePet(input: DonatePetInput): Observable<DonatePetResult> {
    const {accessToken} = input;
    return this.api.put<DonatePetResult>(`${environment.apiUrl}/donation/pet`, input, accessToken)
      .pipe(map((result: DonatePetResult) => {
        return result;
      }));
  }

  getDonations(input: GetDonationsInput): Observable<DonationResult[]> {
    const {accessToken} = input;
    return this.api.get<DonationResult[]>(`${environment.apiUrl}/donation`, accessToken)
      .pipe(map((result: DonationResult[]) => {
        return result;
      }));
  }

  signalDonation(input: SignalDonationInput): Observable<SignalDonationResult> {
    const {accessToken} = input;
    return this.api.patch<SignalDonationResult>(`${environment.apiUrl}/donation`, input, accessToken)
      .pipe(map((result: SignalDonationResult) => {
        return result;
      }));
  }
}
