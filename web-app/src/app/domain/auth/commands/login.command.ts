import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {LoginInput} from './inputs/login.input';
import {LoginResult} from '../models/results/login.result';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class LoginCommand implements Command<LoginInput, LoginResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: LoginInput): Observable<LoginResult> {
    return this.repos.login(params);
  }
}
