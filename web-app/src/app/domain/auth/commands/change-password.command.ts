import {Command} from '../../../core/base/command';
import {ChangePasswordInput} from './inputs/change-password.input';
import {ChangePasswordResult} from '../models/results/change-password.result';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordCommand implements Command<ChangePasswordInput, ChangePasswordResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: ChangePasswordInput): Observable<ChangePasswordResult> {
    return this.repos.changePassword(params);
  }
}
