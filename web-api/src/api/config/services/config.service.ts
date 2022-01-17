import {Injectable} from '@nestjs/common';
import {IConfigRepository} from '../../../domain/config/repositories/iconfig.repository';
import {ConfigRepository} from '../../../infra/config/repositories/config.repository';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';

@Injectable()
export class ConfigService implements IConfigRepository {
    constructor(
        private readonly repos: ConfigRepository
    ) {
    }

    async getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        return await this.repos.getPersonTypes(input);
    }
}
