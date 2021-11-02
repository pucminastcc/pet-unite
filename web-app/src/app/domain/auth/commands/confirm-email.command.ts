import {Command} from '../../../core/base/command';
import {ConfirmEmailInput} from './inputs/confirm-email.input';
import {ConfirmEmailResult} from '../models/results/confirm-email.result';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailCommand implements Command<ConfirmEmailInput, ConfirmEmailResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: ConfirmEmailInput): Observable<ConfirmEmailResult> {
    return this.repos.confirmEmail(params);
  }
}
