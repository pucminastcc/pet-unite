import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from '../services/auth.service';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import * as mocks from 'node-mocks-http';
import {ValidateFacebookUserDto} from '../../../domain/auth/dtos/validate-facebook-user.dto';
import {ValidateGoogleUserDto} from '../../../domain/auth/dtos/validate-google-user.dto';

const loginResult: LoginResult = new LoginResult('', {
    id: '',
    username: '',
    email: '',
    provider: '',
    img: '',
    isSuperUser: false,
    isInstitution: false,
    personTypeId: '',
    document: '',
    zipCode: '',
    address: '',
    district: '',
    cityId: '',
    state: '',
    complement: '',
    phone: '',
    cell: '',
    whatsapp: ''
}, '');

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn().mockResolvedValue(loginResult),
                        validateFacebookUser: jest.fn().mockResolvedValue(loginResult),
                        validateGoogleUser: jest.fn().mockResolvedValue(loginResult),
                        confirmEmail: jest.fn,
                        sendPasswordResetCode: jest.fn,
                        validatePasswordResetCode: jest.fn,
                        changePassword: jest.fn,
                        getUser: jest.fn,
                        updateUser: jest.fn,
                    }
                }
            ]
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    });

    describe('login', () => {
        it('should return a local user', async () => {
            const body: ValidateLocalUserDto = {
                email: 'string',
                password: 'string'
            };

            const req = mocks.createRequest();
            req.res = mocks.createResponse();

            const result = await authController.login(body, req);

            expect(authService.login).toHaveBeenCalledTimes(1);
            expect(result).toEqual(loginResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

            expect(authController.login).rejects.toThrowError();
        });
    });

    describe('facebook', () => {
        it('should return a facebook user', async () => {
            const body: ValidateFacebookUserDto = {
                provider: 'string',
                id: 'string',
                email: 'string',
                name: 'string',
                photoUrl: 'string',
                firstName: 'string',
                lastName: 'string',
                authToken: 'string',
                idToken: 'string',
                authorizationCode: 'string',
                response: 'any',
            };

            const result = await authController.facebook(body);

            expect(authService.login).toHaveBeenCalledTimes(1);
            expect(result).toEqual(loginResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'validateFacebookUser').mockRejectedValueOnce(new Error());

            expect(authController.facebook).rejects.toThrowError();
        });
    });

    describe('google', () => {
        it('should return a google user', async () => {
            const body: ValidateGoogleUserDto = {
                provider: 'string',
                id: 'string',
                email: 'string',
                name: 'string',
                photoUrl: 'string',
                firstName: 'string',
                lastName: 'string',
                authToken: 'string',
                idToken: 'string',
                authorizationCode: 'string',
                response: 'any',
            };

            const result = await authController.google(body);

            expect(authService.login).toHaveBeenCalledTimes(1);
            expect(result).toEqual(loginResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'validateGoogleUser').mockRejectedValueOnce(new Error());

            expect(authController.google).rejects.toThrowError();
        });
    });
});
