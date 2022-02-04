import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DonatePetInput} from './inputs/donate-pet.input';
import {DonatePetResult} from '../models/results/donate-pet.result';
import {Observable} from 'rxjs';
import {PetRepository} from '../../../data/pet/repositories/pet.repository';

@Injectable({
  providedIn: 'root'
})
export class DonatePetCommand implements Command<DonatePetInput, DonatePetResult>{
  constructor(
    private readonly repos: PetRepository
  ) {
  }

  execute(params: DonatePetInput): Observable<DonatePetResult> {
    return this.repos.donatePet(params);
  }
}
