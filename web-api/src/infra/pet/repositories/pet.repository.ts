import {Injectable} from '@nestjs/common';
import {IPetRepository} from '../../../domain/pet/repositories/ipet.repository';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Pet} from '../../../domain/pet/models/pet.model';
import {CreatePetDto} from '../../../domain/pet/dtos/create-pet.dto';
import {CreatePetResult} from '../../../domain/pet/models/results/create-pet.result';
import {DeletePetDto} from '../../../domain/pet/dtos/delete-pet.dto';
import {DeletePetResult} from '../../../domain/pet/models/results/delete-pet.result';
import {UpdatePetDto} from '../../../domain/pet/dtos/update-pet.dto';
import {UpdatePetResult} from '../../../domain/pet/models/results/update-pet.result';
import {GetPetDto} from '../../../domain/pet/dtos/get-pet.dto';
import {GetPetResult} from '../../../domain/pet/models/results/get-pet.result';
import {GetPetsDto} from '../../../domain/pet/dtos/get-pets.dto';
import {GetPetsResult} from '../../../domain/pet/models/results/get-pets.result';

@Injectable()
export class PetRepository extends IPetRepository {
    constructor(
        @InjectModel('Pet') private readonly petModel: Model<Pet>
    ) {
        super();
    }

    getPets(dto: GetPetsDto): Promise<GetPetsResult> {
        return Promise.resolve(undefined);
    }

    getPet(dto: GetPetDto): Promise<GetPetResult> {
        return Promise.resolve(undefined);
    }

    createPet(dto: CreatePetDto): Promise<CreatePetResult> {
        return Promise.resolve(undefined);
    }

    updatePet(dto: UpdatePetDto): Promise<UpdatePetResult> {
        return Promise.resolve(undefined);
    }

    deletePet(dto: DeletePetDto): Promise<DeletePetResult> {
        return Promise.resolve(undefined);
    }
}
