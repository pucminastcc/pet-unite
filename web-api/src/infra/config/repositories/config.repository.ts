import {IConfigRepository} from '../../../domain/config/repositories/iconfig.repository';
import {Injectable} from '@nestjs/common';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/models/results/person-type.result';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {PersonType} from '../../../domain/config/models/person-type.model';
import {PetGender} from '../../../domain/config/models/pet-gender.model';
import {GetPetGendersDto} from '../../../domain/config/dtos/get-pet-genders.dto';
import {PetGenderResult} from '../../../domain/config/models/results/pet-gender.result';
import {BrazilState} from '../../../domain/config/models/brazil-state.model';
import {GetStatesDto} from '../../../domain/config/dtos/get-states.dto';
import {BrazilStateResult} from '../../../domain/config/models/results/brazil-state.result';

@Injectable()
export class ConfigRepository extends IConfigRepository {
    constructor(
        @InjectModel('PersonType') private readonly personTypesModel: Model<PersonType>,
        @InjectModel('PetGender') private readonly petGendersModel: Model<PetGender>,
        @InjectModel('BrazilState') private readonly statesModel: Model<BrazilState>,
    ) {
        super();
    }

    async getPersonTypes(input?: GetPersonTypesDto): Promise<PersonTypeResult[]> {
        let result: PersonTypeResult[] = [];
        const doc = await this.personTypesModel.find().exec();
        if (doc) {
            doc.forEach((data: PersonType) => {
                result.push({
                    id: data.id,
                    description: data.description,
                    document: data.document,
                    documentMask: data.documentMask
                });
            });
        }
        return result;
    }

    async getPetGenders(input?: GetPetGendersDto): Promise<PetGenderResult[]> {
        let result: PetGenderResult[] = [];
        const doc = await this.petGendersModel.find().exec();
        if (doc) {
            doc.forEach((data: PetGender) => {
                result.push({
                    id: data.id,
                    description: data.description,
                });
            });
        }
        return result;
    }

    async getStates(input?: GetStatesDto): Promise<BrazilStateResult[]> {
        let result: BrazilStateResult[] = [];
        const doc = await this.statesModel.find().exec();
        if (doc) {
            doc.forEach((data: BrazilState) => {
                result.push({
                    id: data.id,
                    description: data.description,
                    initials: data.initials
                });
            });
        }
        return result;
    }
}
