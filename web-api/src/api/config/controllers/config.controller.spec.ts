import {Test, TestingModule} from '@nestjs/testing';
import {ConfigController} from './config.controller';
import {ConfigService} from '../services/config.service';
import {GetPersonTypesDto} from '../../../domain/config/dtos/get-person-types.dto';
import {PersonTypeResult} from '../../../domain/config/entities/mocks/person-types-result.mock';
import {GetPetGendersDto} from '../../../domain/config/dtos/get-pet-genders.dto';
import {PetGenderResult} from '../../../domain/config/entities/mocks/pet-gender-result.mock';
import {GetReportTypesDto} from '../../../domain/config/dtos/get-report-types.dto';
import {ReportTypeResult} from '../../../domain/config/entities/mocks/report-type-result.mock';
import {GetStatesDto} from '../../../domain/config/dtos/get-states.dto';
import {BrazilStateResult} from '../../../domain/config/entities/mocks/brazil-state-result.mock';
import {BrazilCityResult} from '../../../domain/config/entities/mocks/brazil-city-result.mock';
import {GetCitiesDto} from '../../../domain/config/dtos/get-cities.dto';
import {PetTypeResult} from '../../../domain/config/models/results/pet-type.result';
import {GetPetTypesDto} from '../../../domain/config/dtos/get-pet-types.dto';

const personTypesResult: PersonTypeResult[] = [
    new PersonTypeResult(null, '', '', ''),
    new PersonTypeResult(null, '', '', ''),
    new PersonTypeResult(null, '', '', '')
];

const petTypesResult: PetTypeResult[] = [
    new PersonTypeResult(null, ''),
    new PersonTypeResult(null, '')
];

const petGendersResult: PetGenderResult[] = [
    new PetGenderResult(null, ''),
    new PetGenderResult(null, '')
];

const reportTypesResult: ReportTypeResult[] = [
    new ReportTypeResult(null, ''),
    new ReportTypeResult(null, '')
];

const brazilStatesResult: BrazilStateResult[] = [
    new BrazilStateResult(null, '', ''),
    new BrazilStateResult(null, '', ''),
    new BrazilStateResult(null, '', ''),
    new BrazilStateResult(null, '', ''),
    new BrazilStateResult(null, '', '')
];

const brazilCitiesResult: BrazilCityResult[] = [
    new BrazilCityResult(null, 0, '', '', 0.0, 0.0),
    new BrazilCityResult(null, 0, '', '', 0.0, 0.0),
    new BrazilCityResult(null, 0, '', '', 0.0, 0.0),
    new BrazilCityResult(null, 0, '', '', 0.0, 0.0),
    new BrazilCityResult(null, 0, '', '', 0.0, 0.0)
]

describe('ConfigController', () => {
    let configController: ConfigController;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConfigController],
            providers: [
                {
                    provide: ConfigService,
                    useValue: {
                        getPersonTypes: jest.fn().mockResolvedValue(personTypesResult),
                        getPetTypes: jest.fn().mockResolvedValue(petTypesResult),
                        getPetGenders: jest.fn().mockResolvedValue(petGendersResult),
                        getReportTypes: jest.fn().mockResolvedValue(reportTypesResult),
                        getStates: jest.fn().mockResolvedValue(brazilStatesResult),
                        getCities: jest.fn().mockResolvedValue(brazilCitiesResult),
                    }
                }
            ]
        }).compile();

        configController = module.get<ConfigController>(ConfigController);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(configController).toBeDefined();
        expect(configService).toBeDefined();
    });

    describe('personTypes', () => {
        it('should return person types', async () => {
            const query: GetPersonTypesDto = {};

            const result = await configController.personTypes(query);

            expect(configService.getPersonTypes).toHaveBeenCalledTimes(1);
            expect(result).toEqual(personTypesResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(configService, 'getPersonTypes').mockRejectedValueOnce(new Error());

            expect(configService.getPersonTypes).rejects.toThrowError();
        });
    });

    describe('petTypes', () => {
        it('should return pet types', async () => {
            const query: GetPetTypesDto = {};

            const result = await configController.petTypes(query);

            expect(configService.getPetTypes).toHaveBeenCalledTimes(1);
            expect(result).toEqual(petTypesResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(configService, 'getPetTypes').mockRejectedValueOnce(new Error());

            expect(configService.getPetTypes).rejects.toThrowError();
        });
    });

    describe('petGenders', () => {
        it('should return pet genders', async () => {
            const query: GetPetGendersDto = {};

            const result = await configController.petGenders(query);

            expect(configService.getPetGenders).toHaveBeenCalledTimes(1);
            expect(result).toEqual(petGendersResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(configService, 'getPetGenders').mockRejectedValueOnce(new Error());

            expect(configService.getPetGenders).rejects.toThrowError();
        });
    });

    describe('reportTypes', () => {
        it('should return report types', async () => {
            const query: GetReportTypesDto = {};

            const result = await configController.reportTypes(query);

            expect(configService.getReportTypes).toHaveBeenCalledTimes(1);
            expect(result).toEqual(reportTypesResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(configService, 'getReportTypes').mockRejectedValueOnce(new Error());

            expect(configService.getReportTypes).rejects.toThrowError();
        });
    });

    describe('states', () => {
        it('should return states in Brazil', async () => {
            const query: GetStatesDto = {};

            const result = await configController.states(query);

            expect(configService.getStates).toHaveBeenCalledTimes(1);
            expect(result).toEqual(brazilStatesResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(configService, 'getStates').mockRejectedValueOnce(new Error());

            expect(configService.getStates).rejects.toThrowError();
        });
    });

    describe('cities', () => {
        it('should return cities in Brazil', async () => {
            const query: GetCitiesDto = {};

            const result = await configController.cities(query);

            expect(configService.getCities).toHaveBeenCalledTimes(1);
            expect(result).toEqual(brazilCitiesResult);
        });

        it('should throw an exception', () => {
            jest.spyOn(configService, 'getCities').mockRejectedValueOnce(new Error());

            expect(configService.getCities).rejects.toThrowError();
        });
    });
});
