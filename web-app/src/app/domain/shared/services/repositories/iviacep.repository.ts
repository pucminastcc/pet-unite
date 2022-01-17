import {Observable} from 'rxjs';
import {AddressResult} from '../models/results/address.result';
import {GetAddressInput} from '../commands/inputs/get-address.input';

export abstract class IViaCepRepository {
  abstract getAddress(input: GetAddressInput): Observable<AddressResult>;
}
