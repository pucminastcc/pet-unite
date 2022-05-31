import {Injectable} from '@angular/core';
import {Command} from '../../../../core/base/command';
import {GetPetTypesInput} from './inputs/get-pet-types.input';
import {PetTypeResult} from '../models/results/pet-type.result';
import {Observable} from 'rxjs';
import {ConfigRepository} from '../../../../data/shared/repositories/config-repository';

@Injectable({
  providedIn: 'root'
})
export class GetPetTypesCommand implements Command<GetPetTypesInput, PetTypeResult[]> {
  constructor(
    private readonly repos: ConfigRepository
  ) {
  }

  execute(params: GetPetTypesInput): Observable<PetTypeResult[]> {
    return this.repos.getPetTypes(params);
  }
}
