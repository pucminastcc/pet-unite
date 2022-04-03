import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {DonatePetInput} from './inputs/donate-pet.input';
import {DonatePetResult} from '../models/results/donate-pet.result';
import {Observable} from 'rxjs';
import {DonationRepository} from '../../../data/donation/repositories/donation.repository';

@Injectable({
  providedIn: 'root'
})
export class DonatePetCommand implements Command<DonatePetInput, DonatePetResult>{
  constructor(
    private readonly repos: DonationRepository
  ) {
  }

  execute(params: DonatePetInput): Observable<DonatePetResult> {
    return this.repos.donatePet(params);
  }
}
