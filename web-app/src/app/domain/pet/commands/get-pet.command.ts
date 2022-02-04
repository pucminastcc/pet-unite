import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetPetInput} from './inputs/get-pet.input';
import {PetResult} from '../models/results/pet.result';
import {Observable} from 'rxjs';
import {PetRepository} from '../../../data/pet/repositories/pet.repository';

@Injectable({
  providedIn: 'root'
})
export class GetPetCommand implements Command<GetPetInput, PetResult>{
  constructor(
    private readonly repos: PetRepository
  ) {
  }

  execute(params: GetPetInput): Observable<PetResult> {
    return this.repos.getPet(params);
  }
}
