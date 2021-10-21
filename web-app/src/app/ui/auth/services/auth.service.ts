import {Injectable} from '@angular/core';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginInput} from '../../../domain/auth/commands/inputs/login.input';
import {Observable} from 'rxjs';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {LoginCommand} from '../../../domain/auth/commands/login.command';
import {RegisterInput} from '../../../domain/auth/commands/inputs/register.input';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {RegisterCommand} from '../../../domain/auth/commands/register.command';
import {SendPasswordResetCodeInput} from '../../../domain/auth/commands/inputs/send-password-reset-code';
import {SendPasswordResetCodeResult} from '../../../domain/auth/models/results/send-password-reset-code.result';
import {ValidatePasswordResetCodeInput} from '../../../domain/auth/commands/inputs/validate-password-reset-code.input';
import {ValidatePasswordResetCodeResult} from '../../../domain/auth/models/results/validate-password-reset-code.result';
import {ValidatePasswordResetCodeCommand} from '../../../domain/auth/commands/validate-password-reset-code.command';
import {SendPasswordResetCodeCommand} from '../../../domain/auth/commands/send-password-reset-code.command';
import {ChangePasswordInput} from '../../../domain/auth/commands/inputs/change-password.input';
import {ChangePasswordResult} from '../../../domain/auth/models/results/change-password.result';
import {ChangePasswordCommand} from '../../../domain/auth/commands/change-password.command';
import {LogoutCommand} from '../../../domain/auth/commands/logout.command';
import {LogoutInput} from '../../../domain/auth/commands/inputs/logout.input';
import {LogoutResult} from '../../../domain/auth/models/results/logout.result';
import {GetAuthenticatedUserInput} from 'src/app/domain/auth/commands/inputs/get-authenticated-user.input';
import {GetAuthenticatedUserCommand} from '../../../domain/auth/commands/get-authenticated-user.command';
import {AuthenticatedUserModel} from '../../../domain/auth/models/authenticated-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthRepository {

  constructor(
    private readonly loginCommand: LoginCommand,
    private readonly registerCommand: RegisterCommand,
    private readonly sendPasswordResetCommand: SendPasswordResetCodeCommand,
    private readonly validatePasswordRecoveryCommand: ValidatePasswordResetCodeCommand,
    private readonly changePasswordCommand: ChangePasswordCommand,
    private readonly logoutCommand: LogoutCommand,
    private readonly getAuthenticatedUserCommand: GetAuthenticatedUserCommand
  ) {
  }

  login(input: LoginInput): Observable<LoginResult> {
    return this.loginCommand.execute(input);
  }

  register(input: RegisterInput): Observable<RegisterResult> {
    return this.registerCommand.execute(input);
  }

  sendPasswordResetCode(input: SendPasswordResetCodeInput): Observable<SendPasswordResetCodeResult> {
    return this.sendPasswordResetCommand.execute(input);
  }

  validatePasswordResetCode(input: ValidatePasswordResetCodeInput): Observable<ValidatePasswordResetCodeResult> {
    return this.validatePasswordRecoveryCommand.execute(input);
  }

  changePassword(input: ChangePasswordInput): Observable<ChangePasswordResult> {
    return this.changePasswordCommand.execute(input);
  }

  logout(input?: LogoutInput): Observable<LogoutResult> {
    return this.logoutCommand.execute(input);
  }

  getAuthenticatedUser(input?: GetAuthenticatedUserInput): Observable<AuthenticatedUserModel> {
    return this.getAuthenticatedUserCommand.execute(input);
  }
}
