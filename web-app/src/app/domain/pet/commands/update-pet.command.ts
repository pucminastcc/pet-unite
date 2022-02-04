import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {UpdatePetInput} from './inputs/update-pet.input';
import {UpdatePetResult} from '../models/results/update-pet.result';
import {Observable} from 'rxjs';
import {PetRepository} from '../../../data/pet/repositories/pet.repository';

@Injectable({
  providedIn: 'root'
})
export class UpdatePetCommand implements Command<UpdatePetInput, UpdatePetResult> {
  constructor(
    private readonly repos: PetRepository
  ) {
  }

  execute(params: UpdatePetInput): Observable<UpdatePetResult> {
    return this.repos.updatePet(params);
  }
}
