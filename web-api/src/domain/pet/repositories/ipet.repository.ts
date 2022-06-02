import {CreatePetDto} from '../dtos/create-pet.dto';
import {CreatePetResult} from '../models/results/create-pet.result';
import {UpdatePetDto} from '../dtos/update-pet.dto';
import {UpdatePetResult} from '../models/results/update-pet.result';
import {DeletePetDto} from '../dtos/delete-pet.dto';
import {DeletePetResult} from '../models/results/delete-pet.result';
import {GetPetDto} from '../dtos/get-pet.dto';
import {GetPetResult} from '../models/results/get-pet.result';
import {GetPetsDto} from '../dtos/get-pets.dto';
import {PetBaseResult} from '../models/results/pet-base.result';

export abstract class IPetRepository {
    abstract getPet(dto: GetPetDto): Promise<GetPetResult>;

    abstract getPets(dto: GetPetsDto): Promise<PetBaseResult[]>;

    abstract createPet(dto: CreatePetDto): Promise<CreatePetResult>;

    abstract updatePet(dto: UpdatePetDto): Promise<UpdatePetResult>;

    abstract deletePet(dto: DeletePetDto): Promise<DeletePetResult>;
}
