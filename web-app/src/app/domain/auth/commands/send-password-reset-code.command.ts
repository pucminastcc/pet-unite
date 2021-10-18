import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {SendPasswordResetCodeInput} from './inputs/send-password-reset-code';
import {SendPasswordResetCodeResult} from '../models/results/send-password-reset-code.result';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendPasswordResetCodeCommand implements Command<SendPasswordResetCodeInput, SendPasswordResetCodeResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: SendPasswordResetCodeInput): Observable<SendPasswordResetCodeResult> {
    return this.repos.sendPasswordResetCode(params);
  }
}
