import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {SendPasswordRecoveryInput} from './inputs/send-password-recovery.input';
import {SendPasswordRecoveryResult} from '../models/results/send-password-recovery.result';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendPasswordRecoveryCommand implements Command<SendPasswordRecoveryInput, SendPasswordRecoveryResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: SendPasswordRecoveryInput): Observable<SendPasswordRecoveryResult> {
    return this.repos.sendPasswordRecovery(params);
  }
}
