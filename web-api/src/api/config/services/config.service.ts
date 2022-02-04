import {Injectable} from '@nestjs/common';
import {IConfigRepository} from '../../../domain/config/repositories/iconfig.repository';
import {ConfigRepository} from '../../../infra/config/repositories/config.repository';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';
import {GetPetGendersDto} from '../../../domain/config/dtos/get-pet-genders.dto';
import {PetGenderResult} from '../../../domain/config/models/results/pet-gender.result';
import {GetStatesDto} from '../../../domain/config/dtos/get-states.dto';
import {BrazilStateResult} from '../../../domain/config/models/results/brazil-state.result';

@Injectable()
export class ConfigService implements IConfigRepository {
    constructor(
        private readonly repos: ConfigRepository
    ) {
    }

    async getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        return await this.repos.getPersonTypes(input);
    }

    async getPetGenders(input?: GetPetGendersDto): Promise<PetGenderResult[]> {
        return await this.repos.getPetGenders(input);
    }

    async getStates(input?: GetStatesDto): Promise<BrazilStateResult[]> {
        return await this.repos.getStates(input);
    }
}
