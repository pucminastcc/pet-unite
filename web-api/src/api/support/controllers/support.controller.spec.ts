import {Test, TestingModule} from '@nestjs/testing';
import {SupportController} from './support.controller';
import {SupportService} from '../services/support.service';
import * as mocks from 'node-mocks-http';
import {SendReportDto} from '../../../domain/support/dtos/send-report.dto';
import {SendReportResult} from '../../../domain/support/entities/mocks/send-report-result.mock';

const sendReportResult: SendReportResult = new SendReportResult(true, '');

describe('SupportController', () => {
    let supportController: SupportController;
    let supportService: SupportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SupportController],
            providers: [
                {
                    provide: SupportService,
                    useValue: {
                        sendReport: jest.fn().mockResolvedValue(sendReportResult)
                    }
                }
            ]
        }).compile();

        supportController = module.get<SupportController>(SupportController);
        supportService = module.get<SupportService>(SupportService);
    });

    it('should be defined', () => {
        expect(supportController).toBeDefined();
        expect(supportService).toBeDefined();
    });

    describe('support', () => {
        it('should return success and message', async () => {
            const body: SendReportDto = {
                userId: '624a47cce5ac8d49955684e8',
                email: 'usuario@exemplo.com',
                username: 'usuario@!123',
                date: new Date().toLocaleDateString(),
                subject: 'Lorem Ipsum',
                reportTypeId: '620317f8a7c6a4b23b8986d3',
                description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
            };

            const req = mocks.createRequest();
            req.user = {
                userId: body.userId,
                username: body.username,
                email: body.email,
                date: body.date
            };

            const result = await supportController.sendReport(body, req);

            expect(supportService.sendReport).toHaveBeenCalledTimes(1);
            expect(result).toEqual(sendReportResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(supportService, 'sendReport').mockRejectedValueOnce(new Error());

            expect(supportService.sendReport).rejects.toThrowError();
        });
    });
});
