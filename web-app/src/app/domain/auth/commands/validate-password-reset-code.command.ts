import {Command} from '../../../core/base/command';
import {ValidatePasswordResetCodeInput} from './inputs/validate-password-reset-code.input';
import {ValidatePasswordResetCodeResult} from '../models/results/validate-password-reset-code.result';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class ValidatePasswordResetCodeCommand implements Command<ValidatePasswordResetCodeInput, ValidatePasswordResetCodeResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: ValidatePasswordResetCodeInput): Observable<ValidatePasswordResetCodeResult> {
    return this.repos.validatePasswordResetCode(params);
  }
}
