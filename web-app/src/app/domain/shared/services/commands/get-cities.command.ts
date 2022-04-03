import {Injectable} from '@angular/core';
import {Command} from '../../../../core/base/command';
import {GetCitiesInput} from './inputs/get-cities.input';
import {CityResult} from '../models/results/city.result';
import {Observable} from 'rxjs';
import {ConfigRepository} from '../../../../data/shared/repositories/config-repository';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesCommand implements Command<GetCitiesInput, CityResult[]>{
  constructor(
    private readonly repos: ConfigRepository
  ) {
  }

  execute(params: GetCitiesInput): Observable<CityResult[]> {
    return this.repos.getCities(params);
  }
}
