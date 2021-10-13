import {Injectable} from '@angular/core';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginInput} from '../../../domain/auth/commands/inputs/login.input';
import {Observable} from 'rxjs';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {LoginCommand} from '../../../domain/auth/commands/login.command';
import {RegisterInput} from '../../../domain/auth/commands/inputs/register.input';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {RegisterCommand} from '../../../domain/auth/commands/register.command';
import {SendPasswordRecoveryInput} from '../../../domain/auth/commands/inputs/send-password-recovery.input';
import {SendPasswordRecoveryResult} from '../../../domain/auth/models/results/send-password-recovery.result';
import {SendPasswordRecoveryCommand} from '../../../domain/auth/commands/send-password-recovery.command';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthRepository{

  constructor(
    private readonly loginCommand: LoginCommand,
    private readonly registerCommand: RegisterCommand,
    private readonly sendPasswordRecoveryCommand: SendPasswordRecoveryCommand,
  ) {
  }

  login(input: LoginInput): Observable<LoginResult> {
    return this.loginCommand.execute(input);
  }

  register(input: RegisterInput): Observable<RegisterResult> {
    return this.registerCommand.execute(input);
  }

  sendPasswordRecovery(input: SendPasswordRecoveryInput): Observable<SendPasswordRecoveryResult> {
    return this.sendPasswordRecoveryCommand.execute(input);
  }
}
