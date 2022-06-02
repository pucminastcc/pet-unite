import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from '../services/auth.service';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import * as mocks from 'node-mocks-http';
import {ValidateFacebookUserDto} from '../../../domain/auth/dtos/validate-facebook-user.dto';
import {ValidateGoogleUserDto} from '../../../domain/auth/dtos/validate-google-user.dto';
import {RegisterDto} from '../../../domain/auth/dtos/register.dto';
import {LoginResult} from '../../../domain/auth/entities/mocks/login-result.mock';
import {RegisterResult} from '../../../domain/auth/entities/mocks/register-result.mock';
import {UserModel} from '../../../domain/auth/entities/mocks/user-model.mock';
import {GetUserResult} from '../../../domain/auth/entities/mocks/get-user-result.mock';
import {UpdateUserResult} from '../../../domain/auth/entities/mocks/update-user-result.mock';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';

const registerResult: RegisterResult = new RegisterResult(true, '');

const loginResult: LoginResult = new LoginResult('',
    new UserModel('', '', '', '', '', false, false, '',
    '', '', '', '', '', '', '', '', '',
    ''), '');

const getUserResult: GetUserResult = new GetUserResult(true,
    new UserModel('', '', '', '', '', false, false, '',
        '', '', '', '', '', '', '', '', '',
        ''
    )
);

const updateUserResult: UpdateUserResult = new UpdateUserResult(true, new LoginResult('',
    new UserModel('', '', '', '', '', false, false, '',
        '', '', '', '', '', '', '', '', '',
        ''), ''), '');

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
                        register: jest.fn().mockResolvedValue(registerResult),
                        login: jest.fn().mockResolvedValue(loginResult),
                        validateFacebookUser: jest.fn().mockResolvedValue(loginResult),
                        validateGoogleUser: jest.fn().mockResolvedValue(loginResult),
                        confirmEmail: jest.fn,
                        sendPasswordResetCode: jest.fn,
                        validatePasswordResetCode: jest.fn,
                        changePassword: jest.fn,
                        getUser: jest.fn().mockResolvedValue(getUserResult),
                        updateUser: jest.fn().mockResolvedValue(updateUserResult),
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

    describe('registration', () => {
        it('should return success and message', async () => {
            const body: RegisterDto = {
                email: 'usuario@exemplo.com',
                username: 'Usuário',
                password: '@Senha!23',
                terms: true,
                activated: false,
                provider: 'application',
                img: 'data:image/png;base64,...'
            };

            const req = mocks.createRequest();
            req.res = mocks.createResponse();

            const result = await authController.registration(body);

            expect(authService.register).toHaveBeenCalledTimes(1);
            expect(result).toEqual(registerResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'register').mockRejectedValueOnce(new Error());

            expect(authService.register).rejects.toThrowError();
        });
    });

    describe('login', () => {
        it('should return a local user', async () => {
            const body: ValidateLocalUserDto = {
                email: 'usuario@exemplo.com',
                password: 'usuario@!123'
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
                provider: '',
                id: '',
                email: '',
                name: '',
                photoUrl: '',
                firstName: '',
                lastName: '',
                authToken: '',
                idToken: '',
                authorizationCode: '',
                response: '',
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
                provider: '',
                id: '',
                email: '',
                name: '',
                photoUrl: '',
                firstName: '',
                lastName: '',
                authToken: '',
                idToken: '',
                authorizationCode: '',
                response: '',
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

    describe('getUser', () => {
        it('should return a user data', async () => {
            let req = mocks.createRequest();
            req.user = {
                id: '624a47cce5ac8d49955684e8'
            };

            const result = await authController.getUser(req);

            expect(authService.getUser).toHaveBeenCalledTimes(1);
            expect(result).toEqual(getUserResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'getUser').mockRejectedValueOnce(new Error());

            expect(authController.getUser).rejects.toThrowError();
        });
    });

    describe('updateUser', () => {
        it('should update a user data', async () => {
            let req = mocks.createRequest();
            req.user = {
                id: '624a47cce5ac8d49955684e8'
            };

            const body: UpdateUserDto = {
                id: '624a47cce5ac8d49955684e8',
                img: 'data:image/png;base64,...',
                username: 'Usuário',
                personTypeId: '61edc763ba146329a791e7a3',
                document: '390.319.950-88',
                zipCode: '15700-128',
                address: 'Avenida João Amadeu',
                district: 'Centro',
                cityId: '6208175ab016a03e00c60da0',
                state: 'SP',
                complement: 'de 2801 a 3099 - lado ímpar',
                phone: '(17)3632-3632',
                cell: '(17)99799-9999',
                whatsapp: '(17)99799-9999',
                permissionRequest: false
            };

            const result = await authController.updateUser(body, req);

            expect(authService.updateUser).toHaveBeenCalledTimes(1);
            expect(result).toEqual(updateUserResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(authService, 'updateUser').mockRejectedValueOnce(new Error());

            expect(authController.updateUser).rejects.toThrowError();
        });
    });
});
