import {Injectable} from '@angular/core';
import {Command} from '../../../../core/base/command';
import {GetPetGendersInput} from './inputs/get-pet-genders.input';
import {PetGenderResult} from '../models/results/pet-gender.result';
import {ConfigRepository} from '../../../../data/shared/repositories/config-repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPetGendersCommand implements Command<GetPetGendersInput, PetGenderResult[]> {
  constructor(
    private readonly repos: ConfigRepository
  ) {
  }

  execute(params: GetPetGendersInput): Observable<PetGenderResult[]> {
    return this.repos.getPetGenders(params);
  }
}
