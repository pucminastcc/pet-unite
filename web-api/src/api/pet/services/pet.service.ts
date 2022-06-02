import {Injectable} from '@nestjs/common';
import {IPetRepository} from '../../../domain/pet/repositories/ipet.repository';
import {PetRepository} from '../../../infra/pet/repositories/pet.repository';
import {CreatePetDto} from '../../../domain/pet/dtos/create-pet.dto';
import {CreatePetResult} from '../../../domain/pet/models/results/create-pet.result';
import {UpdatePetDto} from '../../../domain/pet/dtos/update-pet.dto';
import {UpdatePetResult} from '../../../domain/pet/models/results/update-pet.result';
import {DeletePetDto} from '../../../domain/pet/dtos/delete-pet.dto';
import {DeletePetResult} from '../../../domain/pet/models/results/delete-pet.result';
import {GetPetDto} from '../../../domain/pet/dtos/get-pet.dto';
import {GetPetResult} from '../../../domain/pet/models/results/get-pet.result';
import {GetPetsDto} from '../../../domain/pet/dtos/get-pets.dto';
import {PetBaseResult} from '../../../domain/pet/models/results/pet-base.result';


@Injectable()
export class PetService implements IPetRepository{
    constructor(
        private readonly petRepository: PetRepository
    ) {
    }

    async getPets(dto: GetPetsDto): Promise<PetBaseResult[]> {
        return await this.petRepository.getPets(dto);
    }

    async getPet(dto: GetPetDto): Promise<GetPetResult> {
        return await this.petRepository.getPet(dto);
    }

    async createPet(dto: CreatePetDto): Promise<CreatePetResult> {
        return await this.petRepository.createPet(dto);
    }

    async updatePet(dto: UpdatePetDto): Promise<UpdatePetResult> {
        return await this.petRepository.updatePet(dto);
    }

    async deletePet(dto: DeletePetDto): Promise<DeletePetResult> {
        return await this.petRepository.deletePet(dto);
    }
}
