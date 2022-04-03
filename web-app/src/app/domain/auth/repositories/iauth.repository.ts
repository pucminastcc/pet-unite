import {Observable} from 'rxjs';
import {LoginInput} from '../commands/inputs/login.input';
import {LoginFacebookInput} from '../commands/inputs/login-facebook.input';
import {LoginGoogleInput} from '../commands/inputs/login-google.input';
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
import {ConfirmEmailInput} from '../commands/inputs/confirm-email.input';
import {ConfirmEmailResult} from '../models/results/confirm-email.result';
import {GetTokenInput} from '../commands/inputs/get-token.input';
import {UpdateUserInput} from '../commands/inputs/update-user.input';
import {UpdateUserResult} from '../models/results/update-user.result';
import {GetUserInput} from '../commands/inputs/get-user.input';
import {GetUserResult} from '../models/results/get-user.result';

export abstract class IAuthRepository {
  abstract login(input: LoginInput): Observable<LoginResult>;

  abstract loginFacebok(input: LoginFacebookInput): Observable<LoginResult>;

  abstract loginGoogle(input: LoginGoogleInput): Observable<LoginResult>;

  abstract register(input: RegisterInput): Observable<RegisterResult>;

  abstract sendPasswordResetCode(input: SendPasswordResetCodeInput): Observable<SendPasswordResetCodeResult>;

  abstract validatePasswordResetCode(input: ValidatePasswordResetCodeInput): Observable<ValidatePasswordResetCodeResult>;

  abstract changePassword(input: ChangePasswordInput): Observable<ChangePasswordResult>;

  abstract logout(input?: LogoutInput): Observable<LogoutResult>;

  abstract getAuthenticatedUser(input: GetAuthenticatedUserInput): Observable<AuthenticatedUserModel>;

  abstract confirmEmail(input: ConfirmEmailInput): Observable<ConfirmEmailResult>;

  abstract getToken(input?: GetTokenInput): string;

  abstract getUser(input: GetUserInput): Observable<GetUserResult>;

  abstract updateUser(input: UpdateUserInput): Observable<UpdateUserResult>;
}
