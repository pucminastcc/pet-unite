import {Command} from '../../../core/base/command';
import {CreatePetInput} from './inputs/create-pet.input';
import {CreatePetResult} from '../models/results/create-pet.result';
import {PetRepository} from '../../../data/pet/repositories/pet.repository';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePetCommand implements Command<CreatePetInput, CreatePetResult> {
  constructor(
    private readonly repos: PetRepository
  ) {
  }

  execute(params: CreatePetInput): Observable<CreatePetResult> {
    return this.repos.createPet(params);
  }
}
