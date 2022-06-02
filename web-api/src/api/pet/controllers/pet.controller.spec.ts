import {Test, TestingModule} from '@nestjs/testing';
import {PetController} from './pet.controller';
import {PetService} from '../services/pet.service';
import {PetBaseResult} from '../../../domain/pet/entities/mocks/pet-base-result.mock';
import {GetPetResult} from '../../../domain/pet/entities/mocks/get-pet-result.mock';
import {CreatePetResult} from '../../../domain/pet/entities/mocks/create-pet-result.mock';
import {UpdatePetResult} from '../../../domain/pet/entities/mocks/update-pet-result.mock';
import {DeletePetResult} from '../../../domain/pet/entities/mocks/delete-pet-result.mock';
import * as mocks from 'node-mocks-http';
import {GetPetsDto} from '../../../domain/pet/dtos/get-pets.dto';
import {Types} from 'mongoose';
import {GetPetDto} from '../../../domain/pet/dtos/get-pet.dto';
import {CreatePetDto} from '../../../domain/pet/dtos/create-pet.dto';
import {UpdatePetDto} from '../../../domain/pet/dtos/update-pet.dto';
import {DeletePetDto} from '../../../domain/pet/dtos/delete-pet.dto';

const petBaseResult: PetBaseResult = new PetBaseResult(
    null, '', '', null, false, false, null
);

const getPetResult: GetPetResult = new GetPetResult(
    null, '', '', null, null, '', '', 5,
    5, 5, 5, ''
);

const createPetResult: CreatePetResult = new CreatePetResult(true, '');

const updatePetResult: UpdatePetResult = new UpdatePetResult(true);

const deletePetResult: DeletePetResult = new DeletePetResult(true);

describe('PetController', () => {
    let petController: PetController;
    let petService: PetService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PetController],
            providers: [
                {
                    provide: PetService,
                    useValue: {
                        getPets: jest.fn().mockResolvedValue(petBaseResult),
                        getPet: jest.fn().mockResolvedValue(getPetResult),
                        createPet: jest.fn().mockResolvedValue(createPetResult),
                        updatePet: jest.fn().mockResolvedValue(updatePetResult),
                        deletePet: jest.fn().mockResolvedValue(deletePetResult),
                    }
                }
            ]
        }).compile();

        petController = module.get<PetController>(PetController);
        petService = module.get<PetService>(PetService);
    });

    it('should be defined', () => {
        expect(petController).toBeDefined();
        expect(petService).toBeDefined();
    });

    describe('getPets', () => {
        it('should return pets of user', async () => {
            const query: GetPetsDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8')
            };

            const req = mocks.createRequest();
            req.user = {
                userId: query.userId
            };

            const result = await petController.getPets(query, req);

            expect(petService.getPets).toHaveBeenCalledTimes(1);
            expect(result).toEqual(petBaseResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(petService, 'getPets').mockRejectedValueOnce(new Error());

            expect(petService.getPets).rejects.toThrowError();
        });
    });

    describe('getPet', () => {
        it('should return pet detail of user', async () => {
            const query: GetPetDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                id: '6297ccc4ff5f11261e64ba6f'
            };

            const req = mocks.createRequest();
            req.user = {
                userId: query.userId
            };

            const result = await petController.getPet(query, req);

            expect(petService.getPet).toHaveBeenCalledTimes(1);
            expect(result).toEqual(getPetResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(petService, 'getPet').mockRejectedValueOnce(new Error());

            expect(petService.getPet).rejects.toThrowError();
        });
    });

    describe('createPet', () => {
        it('should create a pet', async () => {
            const body: CreatePetDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                img: 'data:image/png;base64,...',
                name: 'Bob',
                petGenderId: '61f57bd1ba146329a791e7b1',
                petTypeId: '628ed0c40d3111c83259ce66',
                breed: 'Labrador',
                description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
                rateLikesChild: 5,
                rateLikesTours: 4,
                rateFriendly: 5,
                rateTraining: 3,
                age: '3 meses'
            };

            const req = mocks.createRequest();
            req.user = {
                userId: ''
            };

            const result = await petController.createPet(body, req);

            expect(petService.createPet).toHaveBeenCalledTimes(1);
            expect(result).toEqual(createPetResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(petService, 'createPet').mockRejectedValueOnce(new Error());

            expect(petService.createPet).rejects.toThrowError();
        });
    });

    describe('updatePet', () => {
        it('should update a pet', async () => {
            const body: UpdatePetDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                id: '6297e4ef79e615bc42c1b59e',
                img: 'data:image/png;base64,...',
                name: 'Bob',
                petGenderId: '61f57bd1ba146329a791e7b1',
                petTypeId: '628ed0c40d3111c83259ce66',
                breed: 'Labrador',
                description: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
                rateLikesChild: 5,
                rateLikesTours: 4,
                rateFriendly: 5,
                rateTraining: 3,
                age: '3 meses'
            };

            const req = mocks.createRequest();
            req.user = {
                userId: body.userId
            };

            const result = await petController.updatePet(body, req);

            expect(petService.updatePet).toHaveBeenCalledTimes(1);
            expect(result).toEqual(updatePetResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(petService, 'updatePet').mockRejectedValueOnce(new Error());

            expect(petService.updatePet).rejects.toThrowError();
        });
    });

    describe('deletePet', () => {
        it('should delete a pet', async () => {
            const query: DeletePetDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                id: '6297e4ef79e615bc42c1b59e',
            };

            const req = mocks.createRequest();
            req.user = {
                userId: query.userId
            };

            const result = await petController.deletePet(query, req);

            expect(petService.deletePet).toHaveBeenCalledTimes(1);
            expect(result).toEqual(deletePetResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(petService, 'updatePet').mockRejectedValueOnce(new Error());

            expect(petService.updatePet).rejects.toThrowError();
        });
    });
});
