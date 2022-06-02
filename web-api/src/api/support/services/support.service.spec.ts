import {Test, TestingModule} from '@nestjs/testing';
import {SupportService} from './support.service';
import {SupportRepository} from '../../../infra/support/repositories/support.repository';

describe('SupportService', () => {
    let service: SupportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SupportService, {provide: SupportRepository, useFactory: jest.fn()}],
        }).compile();

        service = module.get<SupportService>(SupportService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
