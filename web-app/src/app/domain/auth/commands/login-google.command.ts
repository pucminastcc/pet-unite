import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {LoginGoogleInput} from './inputs/login-google.input';
import {LoginResult} from '../models/results/login.result';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class LoginGoogleCommand implements Command<LoginGoogleInput, LoginResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: LoginGoogleInput): Observable<LoginResult> {
    return this.repos.loginGoogle(params);
  }
}
