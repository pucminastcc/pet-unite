import {Test, TestingModule} from '@nestjs/testing';
import {PetService} from './pet.service';
import {PetRepository} from '../../../infra/pet/repositories/pet.repository';

describe('PetService', () => {
    let service: PetService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PetService, {provide: PetRepository, useFactory: jest.fn()},],
        }).compile();

        service = module.get<PetService>(PetService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
