import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from './config.service';
import {ConfigRepository} from '../../../infra/config/repositories/config.repository';

describe('ConfigService', () => {
    let service: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigService, {provide: ConfigRepository, useFactory: jest.fn()}],
        }).compile();

        service = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
