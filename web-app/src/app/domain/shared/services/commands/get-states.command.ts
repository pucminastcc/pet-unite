import {Injectable} from '@angular/core';
import {Command} from '../../../../core/base/command';
import {GetStatesInput} from './inputs/get-states.input';
import {StateResult} from '../models/results/state.result';
import {Observable} from 'rxjs';
import {ConfigRepository} from '../../../../data/shared/repositories/config-repository';

@Injectable({
  providedIn: 'root'
})
export class GetStatesCommand implements Command<GetStatesInput, StateResult[]>{
  constructor(
    private readonly repos: ConfigRepository
  ) {
  }

  execute(params: GetStatesInput): Observable<StateResult[]> {
    return this.repos.getStates(params);
  }
}
