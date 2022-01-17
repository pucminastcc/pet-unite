import {Observable} from 'rxjs';
import {PersonTypeResult} from '../models/results/person-type.result';
import {GetPersonTypesInput} from '../commands/inputs/get-person-types.input';

export abstract class IConfigRepository {
  abstract getPersonTypes(input: GetPersonTypesInput): Observable<PersonTypeResult[]>;
}
