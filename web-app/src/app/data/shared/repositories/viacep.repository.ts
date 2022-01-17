import {IViaCepRepository} from '../../../domain/shared/services/repositories/iviacep.repository';
import {Injectable} from '@angular/core';
import {GetAddressInput} from '../../../domain/shared/services/commands/inputs/get-address.input';
import {AddressResult} from '../../../domain/shared/services/models/results/address.result';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViaCepRepository extends IViaCepRepository {
  constructor(
    private readonly http: HttpClient
  ) {
    super();
  }

  getAddress(input: GetAddressInput): Observable<AddressResult> {
    const {zipCode} = input;
    return this.http.get<AddressResult>(`${environment.viaCepUrl}/${zipCode}/json/`)
      .pipe(map((data: AddressResult) => {
        return data;
      }));
  }
}
