import {Injectable} from '@angular/core';
import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {ApiDatasource} from '../../datasources/api.datasource';
import {Observable} from 'rxjs';
import {DonatePetInput} from '../../../domain/donation/commands/inputs/donate-pet.input';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {DonationResult} from '../../../domain/donation/models/results/donation.result';
import {SignalDonationInput} from 'src/app/domain/donation/commands/inputs/signal-donation.input';
import {SignalDonationResult} from 'src/app/domain/donation/models/results/signal-donation.result';
import {GetUserDonationsInput} from '../../../domain/donation/commands/inputs/get-user-donations.input';
import {GetThirdDonationsInput} from 'src/app/domain/donation/commands/inputs/get-third-donations.input';
import {DeleteDonationInput} from '../../../domain/donation/commands/inputs/delete-donation.input';
import {DeleteDonationResult} from '../../../domain/donation/models/results/delete-donation.result';
import {GetDonationInput} from '../../../domain/donation/commands/inputs/get-donation.input';
import {GetFlaggedDonationsInput} from '../../../domain/donation/commands/inputs/get-flagged-donations.input';
import { UpdateDonationStatusInput } from 'src/app/domain/donation/commands/inputs/update-donation-status.input';
import { UpdateDonationStatusResult } from 'src/app/domain/donation/models/results/update-donation-status.result';

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
    return this.api.post<DonatePetResult>(`${environment.apiUrl}/donation/pet`, input, accessToken)
      .pipe(map((result: DonatePetResult) => {
        return result;
      }));
  }

  getThirdDonations(input: GetThirdDonationsInput): Observable<DonationResult[]> {
    const {state, petTypeId, petGenderId, currentDate, accessToken} = input;
    return this.api.get<DonationResult[]>(`${environment.apiUrl}/donation/third?state=${state}&petTypeId=${petTypeId}&petGenderId=${petGenderId}&currentDate=${currentDate}`, accessToken)
      .pipe(map((result: DonationResult[]) => {
        return result;
      }));
  }

  getUserDonations(input: GetUserDonationsInput): Observable<DonationResult[]> {
    const {accessToken} = input;
    return this.api.get<DonationResult[]>(`${environment.apiUrl}/donation/user`, accessToken)
      .pipe(map((result: DonationResult[]) => {
        return result;
      }));
  }

  getFlaggedDonations(input: GetFlaggedDonationsInput): Observable<DonationResult[]> {
    const {donatedToInstitution, accessToken} = input;
    return this.api.get<DonationResult[]>(`${environment.apiUrl}/donation/flagged?donatedToInstitution=${donatedToInstitution}`, accessToken)
      .pipe(map((result: DonationResult[]) => {
        return result;
      }));
  }

  signalDonation(input: SignalDonationInput): Observable<SignalDonationResult> {
    const {accessToken} = input;
    return this.api.patch<SignalDonationResult>(`${environment.apiUrl}/donation/signal`, input, accessToken)
      .pipe(map((result: SignalDonationResult) => {
        return result;
      }));
  }

  updateDonationStatus(input: UpdateDonationStatusInput): Observable<UpdateDonationStatusResult> {
    const {accessToken} = input;
    return this.api.put<UpdateDonationStatusResult>(`${environment.apiUrl}/donation/status`, input, accessToken)
      .pipe(map((result: UpdateDonationStatusResult) => {
        return result;
      }));
  }

  deleteDonation(input: DeleteDonationInput): Observable<DeleteDonationResult> {
    const {donationId, petId, accessToken} = input;
    return this.api.delete<DeleteDonationResult>(`${environment.apiUrl}/donation/user?donationId=${donationId}&petId=${petId}`, accessToken)
      .pipe(map((result: DeleteDonationResult) => {
        return result;
      }));
  }

  getDonation(input: GetDonationInput): Observable<DonationResult> {
    const {donationId, accessToken} = input;
    return this.api.get<DonationResult>(`${environment.apiUrl}/donation/detail?donationId=${donationId}`, accessToken)
      .pipe(map((result: DonationResult) => {
        return result;
      }));
  }
}
