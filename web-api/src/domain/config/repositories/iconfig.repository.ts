import {GetPersonTypesDto} from '../dtos/get-person-types.dto';
import {PersonTypeResult} from '../models/results/person-type.result';
import {GetPetGendersDto} from '../dtos/get-pet-genders.dto';
import {PetGenderResult} from '../models/results/pet-gender.result';
import {GetStatesDto} from '../dtos/get-states.dto';
import {BrazilStateResult} from '../models/results/brazil-state.result';

export abstract class IConfigRepository {
    abstract getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]>;
    abstract getPetGenders(input?: GetPetGendersDto): Promise<PetGenderResult[]>;
    abstract getStates(input?: GetStatesDto): Promise<BrazilStateResult[]>;
}
