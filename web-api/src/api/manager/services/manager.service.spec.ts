import {Test, TestingModule} from '@nestjs/testing';
import {ManagerService} from './manager.service';
import {ManagerRepository} from '../../../infra/manager/repositories/manager.repository';

describe('ManagerService', () => {
    let service: ManagerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerService, {provide: ManagerRepository, useFactory: jest.fn()},],
        }).compile();

        service = module.get<ManagerService>(ManagerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
