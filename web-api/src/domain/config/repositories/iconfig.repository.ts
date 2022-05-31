import {GetPersonTypesDto} from '../dtos/get-person-types.dto';
import {PersonTypeResult} from '../models/results/person-type.result';
import {GetPetGendersDto} from '../dtos/get-pet-genders.dto';
import {PetGenderResult} from '../models/results/pet-gender.result';
import {GetStatesDto} from '../dtos/get-states.dto';
import {BrazilStateResult} from '../models/results/brazil-state.result';
import {GetReportTypesDto} from '../dtos/get-report-types.dto';
import {ReportTypeResult} from '../models/results/report-type.result';
import {GetCitiesDto} from '../dtos/get-cities.dto';
import {BrazilCityResult} from '../models/results/brazil-city.result';
import {GetPetTypesDto} from '../dtos/get-pet-types.dto';
import {PetTypeResult} from '../models/results/pet-type.result';

export abstract class IConfigRepository {
    abstract getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]>;
    abstract getPetTypes(input?: GetPetTypesDto): Promise<PetTypeResult[]>;
    abstract getPetGenders(input?: GetPetGendersDto): Promise<PetGenderResult[]>;
    abstract getStates(input?: GetStatesDto): Promise<BrazilStateResult[]>;
    abstract getReportTypes(input?: GetReportTypesDto): Promise<ReportTypeResult[]>;
    abstract getCities(input?: GetCitiesDto): Promise<BrazilCityResult[]>;
}
