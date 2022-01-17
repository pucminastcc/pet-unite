import {Injectable} from '@angular/core';
import {IViaCepRepository} from '../../../domain/shared/services/repositories/iviacep.repository';
import {GetAddressInput} from '../../../domain/shared/services/commands/inputs/get-address.input';
import {AddressResult} from '../../../domain/shared/services/models/results/address.result';
import {Observable} from 'rxjs';
import {GetAddressCommand} from '../../../domain/shared/services/commands/get-address.command';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService implements IViaCepRepository{

  constructor(
    private readonly getAddressCommand: GetAddressCommand
  ) {
  }

  getAddress(input: GetAddressInput): Observable<AddressResult> {
    return this.getAddressCommand.execute(input);
  }
}
