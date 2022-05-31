import {Injectable} from '@nestjs/common';
import {IConfigRepository} from '../../../domain/config/repositories/iconfig.repository';
import {ConfigRepository} from '../../../infra/config/repositories/config.repository';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';
import {GetPetGendersDto} from '../../../domain/config/dtos/get-pet-genders.dto';
import {PetGenderResult} from '../../../domain/config/models/results/pet-gender.result';
import {GetStatesDto} from '../../../domain/config/dtos/get-states.dto';
import {BrazilStateResult} from '../../../domain/config/models/results/brazil-state.result';
import {GetReportTypesDto} from '../../../domain/config/dtos/get-report-types.dto';
import {ReportTypeResult} from '../../../domain/config/models/results/report-type.result';
import {GetCitiesDto} from '../../../domain/config/dtos/get-cities.dto';
import {BrazilCityResult} from '../../../domain/config/models/results/brazil-city.result';
import {GetPetTypesDto} from '../../../domain/config/dtos/get-pet-types.dto';
import {PetTypeResult} from 'src/domain/config/models/results/pet-type.result';

@Injectable()
export class ConfigService implements IConfigRepository {
    constructor(
        private readonly repos: ConfigRepository
    ) {
    }

    async getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        return await this.repos.getPersonTypes(input);
    }

    async getPetTypes(input?: GetPetTypesDto): Promise<PetTypeResult[]> {
        return await this.repos.getPetTypes(input);
    }

    async getPetGenders(input?: GetPetGendersDto): Promise<PetGenderResult[]> {
        return await this.repos.getPetGenders(input);
    }

    async getStates(input?: GetStatesDto): Promise<BrazilStateResult[]> {
        return await this.repos.getStates(input);
    }

    async getReportTypes(input?: GetReportTypesDto): Promise<ReportTypeResult[]> {
        return await this.repos.getReportTypes(input);
    }

    async getCities(input?: GetCitiesDto): Promise<BrazilCityResult[]> {
        return this.repos.getCities(input);
    }
}
