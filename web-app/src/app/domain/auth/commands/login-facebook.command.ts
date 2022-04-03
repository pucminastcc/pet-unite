import {Command} from '../../../core/base/command';
import {LoginFacebookInput} from './inputs/login-facebook.input';
import {LoginResult} from '../models/results/login.result';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class LoginFacebookCommand implements Command<LoginFacebookInput, LoginResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: LoginFacebookInput): Observable<LoginResult> {
    return this.repos.loginFacebok(params);
  }
}
