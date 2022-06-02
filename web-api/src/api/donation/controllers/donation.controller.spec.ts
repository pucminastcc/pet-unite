import {Test, TestingModule} from '@nestjs/testing';
import {DonationController} from './donation.controller';
import {DonationService} from '../services/donation.service';
import {DonatePetResult} from '../../../domain/donation/entities/mocks/donate-pet-result.mock';
import * as mocks from 'node-mocks-http';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {Types} from 'mongoose';
import {GetThirdDonationsDto} from '../../../domain/donation/dtos/get-third-donations.dto';
import {DonationResult} from '../../../domain/donation/entities/mocks/donation-result.mock';
import {UpdateDonationStatusResult} from '../../../domain/donation/entities/mocks/update-donation-result.mock';
import {DeleteDonationResult} from '../../../domain/donation/entities/mocks/delete-donation-result.mock';
import {Contacts} from '../../../domain/donation/models/donation.model';
import {GetUserDonationsDto} from '../../../domain/donation/dtos/get-user-donations.dto';
import {GetFlaggedDonationsDto} from '../../../domain/donation/dtos/get-flagged-donations.dto';
import {SignalDonationDto} from '../../../domain/donation/dtos/signal-donation.dto';
import {SignalDonationResult} from '../../../domain/donation/entities/mocks/signal-donation-result.mock';
import {UpdateDonationStatusDto} from '../../../domain/donation/dtos/update-donation-status.dto';
import {DeleteDonationDto} from '../../../domain/donation/dtos/delete-donation.dto';
import {GetDonationDto} from '../../../domain/donation/dtos/get-donation.dto';

const donatePetResult: DonatePetResult = new DonatePetResult(true, '');

const donationResult: DonationResult = new DonationResult(
    '', null, '', '', false,
    null, '', '', '', null,
    '', null, '', '', '',
    5, 5, 5, 5, '',
    '', 0, 0, '', [
        new Contacts('', ''),
        new Contacts('', '')
    ], null, '', false, '', '',
    '', 5, '', false, '', false
);

const signalDonationResult: SignalDonationResult = new SignalDonationResult(true, '');

const updateDonationStatusResult: UpdateDonationStatusResult = new UpdateDonationStatusResult(true, '');

const deleteDonationResult: DeleteDonationResult = new DeleteDonationResult(true, '');


describe('DonationController', () => {
    let donationController: DonationController;
    let donationService: DonationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DonationController],
            providers: [
                {
                    provide: DonationService,
                    useValue: {
                        donatePet: jest.fn().mockResolvedValue(donatePetResult),
                        getThirdDonations: jest.fn().mockResolvedValue(donationResult),
                        getUserDonations: jest.fn().mockResolvedValue(donationResult),
                        getFlaggedDonations: jest.fn().mockResolvedValue(donationResult),
                        signalDonation: jest.fn().mockResolvedValue(signalDonationResult),
                        updateDonationStatus: jest.fn().mockResolvedValue(updateDonationStatusResult),
                        deleteDonation: jest.fn().mockResolvedValue(deleteDonationResult),
                        getDonation: jest.fn().mockResolvedValue(donationResult)
                    }
                }
            ]
        }).compile();

        donationController = module.get<DonationController>(DonationController);
        donationService = module.get<DonationService>(DonationService);
    });

    it('should be defined', () => {
        expect(donationController).toBeDefined();
        expect(donationService).toBeDefined();
    });

    describe('donatePet', () => {
        it('should return success and message', async () => {
            const body: DonatePetDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                petId: '6297ee90fe36c1f58e325a3a',
                institutionId: '624a461ae5ac8d49955684dc'
            };

            const req = mocks.createRequest();
            req.user = {
              id: body.userId
            };

            const result = await donationController.donatePet(body, req);

            expect(donationService.donatePet).toHaveBeenCalledTimes(1);
            expect(result).toEqual(donatePetResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'donatePet').mockRejectedValueOnce(new Error());

            expect(donationService.donatePet).rejects.toThrowError();
        });
    });

    describe('getThirdDonations', () => {
        it('should return donations from other users', async () => {
            const query: GetThirdDonationsDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                currentDate: new Date(),
                petTypeId: '',
                petGenderId: '',
                state: ''
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.userId
            };

            const result = await donationController.getThirdDonations(query, req);

            expect(donationService.getThirdDonations).toHaveBeenCalledTimes(1);
            expect(result).toEqual(donationResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'getThirdDonations').mockRejectedValueOnce(new Error());

            expect(donationService.getThirdDonations).rejects.toThrowError();
        });
    });

    describe('getUserDonations', () => {
        it('should return user donations', async () => {
            const query: GetUserDonationsDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.userId
            };

            const result = await donationController.getUserDonations(query, req);

            expect(donationService.getUserDonations).toHaveBeenCalledTimes(1);
            expect(result).toEqual(donationResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'getUserDonations').mockRejectedValueOnce(new Error());

            expect(donationService.getUserDonations).rejects.toThrowError();
        });
    });

    describe('getFlaggedDonations', () => {
        it('should return user flagged donations', async () => {
            const query: GetFlaggedDonationsDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                donatedToInstitution: false
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.userId
            };

            const result = await donationController.getFlaggedDonations(query, req);

            expect(donationService.getFlaggedDonations).toHaveBeenCalledTimes(1);
            expect(result).toEqual(donationResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'getFlaggedDonations').mockRejectedValueOnce(new Error());

            expect(donationService.getFlaggedDonations).rejects.toThrowError();
        });
    });

    describe('signalDonation', () => {
        it('should return success and message', async () => {
            const body: SignalDonationDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                username: 'Usuário',
                donationId: '6297f7a2df860cfd19892832'
            };

            const req = mocks.createRequest();
            req.user = {
                id: body.userId,
                username: body.username
            };

            const result = await donationController.signalDonation(body, req);

            expect(donationService.signalDonation).toHaveBeenCalledTimes(1);
            expect(result).toEqual(signalDonationResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'signalDonation').mockRejectedValueOnce(new Error());

            expect(donationService.signalDonation).rejects.toThrowError();
        });
    });

    describe('updateDonationStatus', () => {
        it('should return success and message', async () => {
            const body: UpdateDonationStatusDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                username: 'Usuário',
                donationId: '6297f7a2df860cfd19892832',
                data: {}
            };

            const req = mocks.createRequest();
            req.user = {
                id: body.userId,
                username: body.username
            };

            const result = await donationController.updateDonationStatus(body, req);

            expect(donationService.updateDonationStatus).toHaveBeenCalledTimes(1);
            expect(result).toEqual(updateDonationStatusResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'updateDonationStatus').mockRejectedValueOnce(new Error());

            expect(donationService.updateDonationStatus).rejects.toThrowError();
        });
    });

    describe('deleteDonation', () => {
        it('should return success and message', async () => {
            const query: DeleteDonationDto = {
                userId: new Types.ObjectId('624a47cce5ac8d49955684e8'),
                donationId: '6297f7a2df860cfd19892832',
                petId: '6297f9dabd0182152d5ea270'
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.userId
            };

            const result = await donationController.deleteDonation(query, req);

            expect(donationService.deleteDonation).toHaveBeenCalledTimes(1);
            expect(result).toEqual(deleteDonationResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'deleteDonation').mockRejectedValueOnce(new Error());

            expect(donationService.deleteDonation).rejects.toThrowError();
        });
    });

    describe('getDonation', () => {
        it('should return donation', async () => {
            const query: GetDonationDto = {
                donationId: '6297f7a2df860cfd19892832',
            };

            const result = await donationController.getDonation(query);

            expect(donationService.getDonation).toHaveBeenCalledTimes(1);
            expect(result).toEqual(donationResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(donationService, 'getDonation').mockRejectedValueOnce(new Error());

            expect(donationService.getDonation).rejects.toThrowError();
        });
    });
});
