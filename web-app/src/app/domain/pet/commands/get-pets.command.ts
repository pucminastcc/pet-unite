import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetPetsInput} from './inputs/get-pets.input';
import {PetsResult} from '../models/results/pets.result';
import {Observable} from 'rxjs';
import {PetRepository} from '../../../data/pet/repositories/pet.repository';

@Injectable({
  providedIn: 'root'
})
export class GetPetsCommand implements Command<GetPetsInput, PetsResult[]> {
  constructor(
    private readonly repos: PetRepository
  ) {
  }

  execute(params: GetPetsInput): Observable<PetsResult[]> {
    return this.repos.getPets(params);
  }
}
