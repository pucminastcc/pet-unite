import {IConfigRepository} from '../../../domain/config/repositories/iconfig.repository';
import {Injectable} from '@nestjs/common';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PersonType} from '../../../domain/config/models/interfaces/person-type.interface';

@Injectable()
export class ConfigRepository extends IConfigRepository {
    constructor(
        @InjectModel('PersonType') private readonly personTypesModel: Model<PersonType>,
    ) {
        super();
    }

    async getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        let result: PersonTypeResult[] = [];
        const doc = await this.personTypesModel.find().exec();
        if(doc) {
            doc.forEach((data: PersonType) => {
                result.push({
                    id: data.id,
                    description: data.description,
                    document: data.document,
                    documentMask: data.documentMask
                });
            });
        }
        return Promise.resolve(result);
    }
}
