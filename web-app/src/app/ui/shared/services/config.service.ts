import {Injectable} from '@angular/core';
import {IConfigRepository} from '../../../domain/shared/services/repositories/iconfig.repository';
import {Observable} from 'rxjs';
import {PersonTypeResult} from '../../../domain/shared/services/models/results/person-type.result';
import {GetPersonTypesCommand} from '../../../domain/shared/services/commands/get-person-types.command';
import {GetPersonTypesInput} from '../../../domain/shared/services/commands/inputs/get-person-types.input';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements IConfigRepository{
  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly getPersonTypesCommand: GetPersonTypesCommand
  ) {
      this.accessToken = this.authService.getToken();
  }

  getPersonTypes(input?: GetPersonTypesInput): Observable<PersonTypeResult[]> {
    return this.getPersonTypesCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
