import {Command} from '../../../core/base/command';
import {Injectable} from '@angular/core';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Observable} from 'rxjs';
import {LogoutInput} from './inputs/logout.input';
import {LogoutResult} from '../models/results/logout.result';

@Injectable({
  providedIn: 'root'
})
export class LogoutCommand implements Command<LogoutInput, LogoutResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params?: LogoutInput): Observable<LogoutResult> {
    return this.repos.logout(params);
  }
}
