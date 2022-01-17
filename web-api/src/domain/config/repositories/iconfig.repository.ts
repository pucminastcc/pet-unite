import {GetPersonTypesDto} from '../dtos/get-person-types.dto';
import {PersonTypeResult} from '../models/results/person-type.result';

export abstract class IConfigRepository {
    abstract getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]>;
}
