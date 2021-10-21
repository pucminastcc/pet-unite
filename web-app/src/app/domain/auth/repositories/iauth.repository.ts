import {Observable} from 'rxjs';
import {LoginInput} from '../commands/inputs/login.input';
import {LoginResult} from '../models/results/login.result';
import {RegisterInput} from '../commands/inputs/register.input';
import {RegisterResult} from '../models/results/register.result';
import {SendPasswordResetCodeInput} from '../commands/inputs/send-password-reset-code';
import {SendPasswordResetCodeResult} from '../models/results/send-password-reset-code.result';
import {ValidatePasswordResetCodeInput} from '../commands/inputs/validate-password-reset-code.input';
import {ValidatePasswordResetCodeResult} from '../models/results/validate-password-reset-code.result';
import {ChangePasswordInput} from '../commands/inputs/change-password.input';
import {ChangePasswordResult} from '../models/results/change-password.result';
import {LogoutInput} from '../commands/inputs/logout.input';
import {LogoutResult} from '../models/results/logout.result';
import {GetAuthenticatedUserInput} from '../commands/inputs/get-authenticated-user.input';
import {AuthenticatedUserModel} from '../models/authenticated-user.model';

export abstract class IAuthRepository {
  abstract login(input: LoginInput): Observable<LoginResult>;

  abstract register(input: RegisterInput): Observable<RegisterResult>;

  abstract sendPasswordResetCode(input: SendPasswordResetCodeInput): Observable<SendPasswordResetCodeResult>;

  abstract validatePasswordResetCode(input: ValidatePasswordResetCodeInput): Observable<ValidatePasswordResetCodeResult>;

  abstract changePassword(input: ChangePasswordInput): Observable<ChangePasswordResult>;

  abstract logout(input?: LogoutInput): Observable<LogoutResult>;

  abstract getAuthenticatedUser(input?: GetAuthenticatedUserInput): Observable<AuthenticatedUserModel>;
}
