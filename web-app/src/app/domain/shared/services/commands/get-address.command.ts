import {Command} from '../../../../core/base/command';
import {GetAddressInput} from './inputs/get-address.input';
import {AddressResult} from '../models/results/address.result';
import {Observable} from 'rxjs';
import {ViaCepRepository} from '../../../../data/shared/repositories/viacep.repository';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAddressCommand implements Command<GetAddressInput, AddressResult> {
  constructor(private readonly repos: ViaCepRepository) {
  }

  execute(params: GetAddressInput): Observable<AddressResult> {
    return this.repos.getAddress(params);
  }
}
