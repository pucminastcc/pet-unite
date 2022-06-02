import {Test, TestingModule} from '@nestjs/testing';
import {DonationService} from './donation.service';
import {DonationRepository} from '../../../infra/donation/repositories/donation.repository';

describe('DonationService', () => {
    let service: DonationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DonationService, {provide: DonationRepository, useFactory: jest.fn()}],
        }).compile();

        service = module.get<DonationService>(DonationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
