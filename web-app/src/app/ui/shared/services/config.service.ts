import {Injectable} from '@angular/core';
import {IConfigRepository} from '../../../domain/shared/services/repositories/iconfig.repository';
import {Observable} from 'rxjs';
import {PersonTypeResult} from '../../../domain/shared/services/models/results/person-type.result';
import {GetPersonTypesCommand} from '../../../domain/shared/services/commands/get-person-types.command';
import {GetPersonTypesInput} from '../../../domain/shared/services/commands/inputs/get-person-types.input';
import {AuthService} from '../../auth/services/auth.service';
import {GetPetGendersInput} from '../../../domain/shared/services/commands/inputs/get-pet-genders.input';
import {PetGenderResult} from '../../../domain/shared/services/models/results/pet-gender.result';
import {GetPetGendersCommand} from '../../../domain/shared/services/commands/get-pet-genders.command';
import {GetStatesInput} from '../../../domain/shared/services/commands/inputs/get-states.input';
import {StateResult} from '../../../domain/shared/services/models/results/state.result';
import {GetStatesCommand} from '../../../domain/shared/services/commands/get-states.command';
import {GetReportTypesCommand} from '../../../domain/shared/services/commands/get-report-types.command';
import {GetReportTypesInput} from '../../../domain/shared/services/commands/inputs/get-report-types.input';
import {ReportTypeResult} from '../../../domain/shared/services/models/results/report-type.result';
import {GetCitiesInput} from '../../../domain/shared/services/commands/inputs/get-cities.input';
import {CityResult} from '../../../domain/shared/services/models/results/city.result';
import {GetCitiesCommand} from '../../../domain/shared/services/commands/get-cities.command';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigRepository {
  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly getPersonTypesCommand: GetPersonTypesCommand,
    private readonly getPetGendersCommand: GetPetGendersCommand,
    private readonly getStatesCommand: GetStatesCommand,
    private readonly getReportTypesCommand: GetReportTypesCommand,
    private readonly getCitiesCommand: GetCitiesCommand
  ) {
    this.accessToken = this.authService.getToken();
  }

  getPersonTypes(input?: GetPersonTypesInput): Observable<PersonTypeResult[]> {
    return this.getPersonTypesCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getPetGenders(input?: GetPetGendersInput): Observable<PetGenderResult[]> {
    return this.getPetGendersCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getStates(input?: GetStatesInput): Observable<StateResult[]> {
    return this.getStatesCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getReportTypes(input?: GetReportTypesInput): Observable<ReportTypeResult[]> {
    return this.getReportTypesCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getCities(input?: GetCitiesInput): Observable<CityResult[]> {
    return this.getCitiesCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
