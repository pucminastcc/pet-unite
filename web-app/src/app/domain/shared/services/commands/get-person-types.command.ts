import {Command} from '../../../../core/base/command';
import {GetPersonTypesInput} from './inputs/get-person-types.input';
import {PersonTypeResult} from '../models/results/person-type.result';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigRepository} from '../../../../data/shared/repositories/config-repository';

@Injectable({
  providedIn: 'root'
})
export class GetPersonTypesCommand implements Command<GetPersonTypesInput, PersonTypeResult[]> {
  constructor(private readonly repos: ConfigRepository) {
  }

  execute(params: GetPersonTypesInput): Observable<PersonTypeResult[]> {
    return this.repos.getPersonTypes(params);
  }
}
