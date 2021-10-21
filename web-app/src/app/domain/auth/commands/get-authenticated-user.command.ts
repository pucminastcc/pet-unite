import {Command} from '../../../core/base/command';
import {Injectable} from '@angular/core';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {GetAuthenticatedUserInput} from './inputs/get-authenticated-user.input';
import {Observable} from 'rxjs';
import {AuthenticatedUserModel} from '../models/authenticated-user.model';

@Injectable({
  providedIn: 'root'
})
export class GetAuthenticatedUserCommand implements Command<GetAuthenticatedUserInput, AuthenticatedUserModel> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params?: GetAuthenticatedUserInput): Observable<AuthenticatedUserModel> {
    return this.repos.getAuthenticatedUser(params);
  }
}
