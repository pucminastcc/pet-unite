import {Injectable} from '@angular/core';
import {IConfigRepository} from '../../../domain/shared/services/repositories/iconfig.repository';
import {GetPersonTypesInput} from '../../../domain/shared/services/commands/inputs/get-person-types.input';
import {Observable} from 'rxjs';
import {PersonTypeResult} from '../../../domain/shared/services/models/results/person-type.result';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {ApiDatasource} from '../../datasources/api.datasource';

@Injectable({
  providedIn: 'root'
})
export class ConfigRepository extends IConfigRepository {
  constructor(
    private readonly api: ApiDatasource
  ) {
    super();
  }

  getPersonTypes(input: GetPersonTypesInput): Observable<PersonTypeResult[]> {
    const {accessToken} = input;
    return this.api.get<PersonTypeResult[]>(`${environment.apiUrl}/config/personTypes`, accessToken)
      .pipe(map((result: PersonTypeResult[]) => {
        return result;
      }));
  }
}
