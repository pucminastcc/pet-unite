import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DeletePetInput} from './inputs/delete-pet.input';
import {DeletePetResult} from '../models/results/delete-pet.result';
import {PetRepository} from '../../../data/pet/repositories/pet.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletePetCommand implements Command<DeletePetInput, DeletePetResult> {
  constructor(
    private readonly repos: PetRepository
  ) {
  }

  execute(params: DeletePetInput): Observable<DeletePetResult> {
    return this.repos.deletePet(params);
  }
}
