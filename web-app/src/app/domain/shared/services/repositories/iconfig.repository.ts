import {Observable} from 'rxjs';
import {GetPersonTypesInput} from '../commands/inputs/get-person-types.input';
import {PersonTypeResult} from '../models/results/person-type.result';
import {GetPetGendersInput} from '../commands/inputs/get-pet-genders.input';
import {PetGenderResult} from '../models/results/pet-gender.result';
import {StateResult} from '../models/results/state.result';
import {GetStatesInput} from '../commands/inputs/get-states.input';

export abstract class IConfigRepository {
  abstract getPersonTypes(input: GetPersonTypesInput): Observable<PersonTypeResult[]>;
  abstract getPetGenders(input: GetPetGendersInput): Observable<PetGenderResult[]>;
  abstract getStates(input: GetStatesInput): Observable<StateResult[]>;
}
