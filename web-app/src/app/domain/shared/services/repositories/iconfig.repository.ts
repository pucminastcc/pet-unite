import {Observable} from 'rxjs';
import {GetPersonTypesInput} from '../commands/inputs/get-person-types.input';
import {PersonTypeResult} from '../models/results/person-type.result';
import {GetPetGendersInput} from '../commands/inputs/get-pet-genders.input';
import {PetGenderResult} from '../models/results/pet-gender.result';
import {StateResult} from '../models/results/state.result';
import {GetStatesInput} from '../commands/inputs/get-states.input';
import {GetReportTypesInput} from '../commands/inputs/get-report-types.input';
import {ReportTypeResult} from '../models/results/report-type.result';
import {GetCitiesInput} from '../commands/inputs/get-cities.input';
import {CityResult} from '../models/results/city.result';
import {GetPetTypesInput} from '../commands/inputs/get-pet-types.input';
import {PetTypeResult} from '../models/results/pet-type.result';

export abstract class IConfigRepository {
  abstract getPersonTypes(input: GetPersonTypesInput): Observable<PersonTypeResult[]>;
  abstract getPetTypes(input: GetPetTypesInput): Observable<PetTypeResult[]>;
  abstract getPetGenders(input: GetPetGendersInput): Observable<PetGenderResult[]>;
  abstract getStates(input: GetStatesInput): Observable<StateResult[]>;
  abstract getReportTypes(input: GetReportTypesInput): Observable<ReportTypeResult[]>;
  abstract getCities(input: GetCitiesInput): Observable<CityResult[]>;
}
