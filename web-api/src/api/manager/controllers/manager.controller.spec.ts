import {Test, TestingModule} from '@nestjs/testing';
import {ManagerController} from './manager.controller';
import {ManagerService} from '../services/manager.service';
import * as mocks from 'node-mocks-http';
import {GetUsersDto} from '../../../domain/manager/dtos/get-users.dto';
import {UserBaseResult} from '../../../domain/manager/entities/mocks/user-base-result.mock';
import {DeleteUserDto} from '../../../domain/manager/dtos/delete-user.dto';
import {DeleteUserResult} from '../../../domain/manager/entities/mocks/delete-user-result.mock';
import {UserAccountResult} from '../../../domain/manager/entities/mocks/user-account-result.mock';
import {ReportBaseResult} from '../../../domain/manager/entities/mocks/report-base-result.mock';
import {ReportResult} from '../../../domain/manager/entities/mocks/report-result.mock';
import {PermissionRequestBaseResult} from '../../../domain/manager/entities/mocks/permission-request-base-result.mock';
import {ReplyPermissionRequestResult} from '../../../domain/manager/entities/mocks/reply-permission-request-result.mock';
import {GetUserAccountDto} from '../../../domain/manager/dtos/get-user-account.dto';
import {GetReportDto} from '../../../domain/manager/dtos/get-report.dto';
import {GetReportsDto} from '../../../domain/manager/dtos/get-reports.dto';
import {GetPermissionRequestsDto} from '../../../domain/manager/dtos/get-permission-requests.dto';
import {ReplyPermissionRequestDto} from '../../../domain/manager/dtos/reply-permission-request.dto';

const userBaseResult: UserBaseResult [] = [
    new UserBaseResult('', '', '', '', false, '', false),
    new UserBaseResult('', '', '', '', false, '', false),
    new UserBaseResult('', '', '', '', false, '', false)
];

const deleteUserResult: DeleteUserResult = new DeleteUserResult(true);

const userAccountResult: UserAccountResult = new UserAccountResult(
    '', '', true, '', false, '', '', '', '', '',
    '', '', '', '', '', '', '', false, false, false,
    0, 0);

const reportBaseResult: ReportBaseResult[] = [
    new ReportBaseResult('', '', '', '', '', ''),
    new ReportBaseResult('', '', '', '', '', '')
];

const reportResult: ReportResult = new ReportResult('', '', '', '', '', '', '');

const permissionRequestBaseResult: PermissionRequestBaseResult[] = [
    new PermissionRequestBaseResult('', '', '', '', '', ''),
    new PermissionRequestBaseResult('', '', '', '', '', ''),
    new PermissionRequestBaseResult('', '', '', '', '', ''),
    new PermissionRequestBaseResult('', '', '', '', '', '')
];

const replyPermissionRequestResult: ReplyPermissionRequestResult = new ReplyPermissionRequestResult(true, '');

describe('ManagerController', () => {
    let managerController: ManagerController;
    let managerService: ManagerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ManagerController],
            providers: [
                {
                    provide: ManagerService,
                    useValue: {
                        getUsers: jest.fn().mockResolvedValue(userBaseResult),
                        deleteUser: jest.fn().mockResolvedValue(deleteUserResult),
                        getUserAccount: jest.fn().mockResolvedValue(userAccountResult),
                        getReports: jest.fn().mockResolvedValue(reportBaseResult),
                        getReport: jest.fn().mockResolvedValue(reportResult),
                        getPermissionRequests: jest.fn().mockResolvedValue(permissionRequestBaseResult),
                        replyPermissionRequest: jest.fn().mockResolvedValue(replyPermissionRequestResult),
                    }
                }
            ]
        }).compile();

        managerController = module.get<ManagerController>(ManagerController);
        managerService = module.get<ManagerService>(ManagerService);
    });

    it('should be defined', () => {
        expect(managerController).toBeDefined();
        expect(managerService).toBeDefined();
    });

    describe('getUsers', () => {
        it('should return users', async () => {
            const query: GetUsersDto = {
                id: null,
                isInstitution: false,
                state: ''
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.id
            };

            const result = await managerController.getUsers(query, req);

            expect(managerService.getUsers).toHaveBeenCalledTimes(1);
            expect(result).toEqual(userBaseResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'getUsers').mockRejectedValueOnce(new Error());

            expect(managerController.getUsers).rejects.toThrowError();
        });
    });

    describe('deleteUser', () => {
        it('should return delete user', async () => {
            const query: DeleteUserDto = {
                id: null,
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.id,
                isSuperUser: true
            };

            const result = await managerController.deleteUser(query, req);

            expect(managerService.deleteUser).toHaveBeenCalledTimes(1);
            expect(result).toEqual(deleteUserResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'deleteUser').mockRejectedValueOnce(new Error());

            expect(managerController.deleteUser).rejects.toThrowError();
        });
    });

    describe('getUserAccount', () => {
        it('should return user account', async () => {
            const query: GetUserAccountDto = {
                id: null,
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.id,
            };

            const result = await managerController.getUserAccount(query, req);

            expect(managerService.getUserAccount).toHaveBeenCalledTimes(1);
            expect(result).toEqual(userAccountResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'getUserAccount').mockRejectedValueOnce(new Error());

            expect(managerController.getUserAccount).rejects.toThrowError();
        });
    });

    describe('getReports', () => {
        it('should return reports', async () => {
            const query: GetReportsDto = {
            };

            const req = mocks.createRequest();
            req.user = {
                isSuperUser: true,
            };

            const result = await managerController.getReports(query, req);

            expect(managerService.getReports).toHaveBeenCalledTimes(1);
            expect(result).toEqual(reportBaseResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'getReports').mockRejectedValueOnce(new Error());

            expect(managerController.getReports).rejects.toThrowError();
        });
    });

    describe('getReport', () => {
        it('should return report', async () => {
            const query: GetReportDto = {
                id: null,
            };

            const req = mocks.createRequest();
            req.user = {
                id: query.id,
                isSuperUser: true,
            };

            const result = await managerController.getReport(query, req);

            expect(managerService.getReport).toHaveBeenCalledTimes(1);
            expect(result).toEqual(reportResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'getReports').mockRejectedValueOnce(new Error());

            expect(managerController.getReports).rejects.toThrowError();
        });
    });

    describe('getPermissionRequests', () => {
        it('should return permission requests', async () => {
            const query: GetPermissionRequestsDto = {
            };

            const req = mocks.createRequest();
            req.user = {
                isSuperUser: true,
            };

            const result = await managerController.getPermissionRequests(query, req);

            expect(managerService.getPermissionRequests).toHaveBeenCalledTimes(1);
            expect(result).toEqual(permissionRequestBaseResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'getPermissionRequests').mockRejectedValueOnce(new Error());

            expect(managerController.getPermissionRequests).rejects.toThrowError();
        });
    });

    describe('replyPermissionRequest', () => {
        it('should return success and message', async () => {
            const body: ReplyPermissionRequestDto = {
                id: '629658ddd498aab6a6099c9a',
                confirm: true
            };

            const req = mocks.createRequest();
            req.user = {
                isSuperUser: true,
            };

            const result = await managerController.replyPermissionRequest(body, req);

            expect(managerService.replyPermissionRequest).toHaveBeenCalledTimes(1);
            expect(result).toEqual(replyPermissionRequestResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(managerService, 'replyPermissionRequest').mockRejectedValueOnce(new Error());

            expect(managerController.replyPermissionRequest).rejects.toThrowError();
        });
    });
});
