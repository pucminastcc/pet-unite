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

    async getPets(dto: GetPetsDto): Promise<GetPetsResult[]> {
        let result: GetPetsResult[] = [];
        const {userId} = dto;
        const pets = await this.petModel.find({userId}).exec();

        if (pets) {
            for (const pet of pets) {
                result.push({
                    id: pet.id,
                    name: pet.name,
                    img: pet.img,
                    inDonation: pet.inDonation
                });
            }
        }
        return result;
    }

    async getPet(dto: GetPetDto): Promise<GetPetResult> {
        let result: GetPetResult;
        const {userId, id} = dto;

        const pet = await this.petModel.findById(id).exec();

        if (pet) {
            result = {
                id: pet.id,
                img: pet.img,
                name: pet.name,
                petGenderId: pet.petGenderId,
                breed: pet.breed,
                description: pet.description
            }
        }
        return result;
    }

    async createPet(dto: CreatePetDto): Promise<CreatePetResult> {
        let result: CreatePetResult = {success: false, id: ''};
        const {userId, img, name, petGenderId, breed, description} = dto;

        const inserted = await this.petModel.insertMany({
            img, name, petGenderId, breed, description, userId
        });

        if (inserted) {
            const pet = inserted.find(e => true);
            result = {success: true, id: pet.id};
        }
        return result;
    }

    async updatePet(dto: UpdatePetDto): Promise<UpdatePetResult> {
        let result: UpdatePetResult = {success: false};
        const {userId, id, img, name, petGenderId, breed, description} = dto;

        const updated = await this.petModel.findByIdAndUpdate(id, {
            img, name, petGenderId, breed, description, userId
        }).exec();

        if(updated) {
            result = {success: true};
        }
        return result;
    }

    async deletePet(dto: DeletePetDto): Promise<DeletePetResult> {
        let result: DeletePetResult = {success: false};
        const {id, userId} = dto;

        const deleted = await this.petModel.deleteOne({
            _id: id,
            userId
        }).exec();

        if(deleted) {
            result = {success: true};
        }
        return result;
    }
}
