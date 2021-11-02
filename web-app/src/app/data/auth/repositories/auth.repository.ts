import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginInput} from '../../../domain/auth/commands/inputs/login.input';
import {Observable, of as observableOf} from 'rxjs';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {LocalService} from '../../../ui/shared/services/local.service';
import {RegisterInput} from '../../../domain/auth/commands/inputs/register.input';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {SendPasswordResetCodeInput} from '../../../domain/auth/commands/inputs/send-password-reset-code';
import {SendPasswordResetCodeResult} from '../../../domain/auth/models/results/send-password-reset-code.result';
import {ValidatePasswordResetCodeInput} from '../../../domain/auth/commands/inputs/validate-password-reset-code.input';
import {ValidatePasswordResetCodeResult} from '../../../domain/auth/models/results/validate-password-reset-code.result';
import {ChangePasswordInput} from '../../../domain/auth/commands/inputs/change-password.input';
import {ChangePasswordResult} from '../../../domain/auth/models/results/change-password.result';
import {LogoutInput} from '../../../domain/auth/commands/inputs/logout.input';
import {LogoutResult} from '../../../domain/auth/models/results/logout.result';
import {GetAuthenticatedUserInput} from 'src/app/domain/auth/commands/inputs/get-authenticated-user.input';
import {AuthenticatedUserModel} from '../../../domain/auth/models/authenticated-user.model';
import {ConfirmEmailInput} from '../../../domain/auth/commands/inputs/confirm-email.input';
import {ConfirmEmailResult} from '../../../domain/auth/models/results/confirm-email.result';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository extends IAuthRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly localService: LocalService
  ) {
    super();
  }

  login(input: LoginInput): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/login`, input)
      .pipe(map((result: LoginResult) => {
        if (result.accessToken) {
          const authValue = {
            accessToken: result.accessToken,
            user: result.user
          };
          // this.localService.decodePayloadJwt(result.accessToken);
          this.localService.setJsonValue('auth', JSON.stringify(authValue));
        }
        return result;
      }));
  }

  register(input: RegisterInput): Observable<RegisterResult> {
    return this.http.post<RegisterResult>(`${environment.apiUrl}/auth/registration`, input)
      .pipe(map((result: RegisterResult) => {
        return result;
      }));
  }

  sendPasswordResetCode(input: SendPasswordResetCodeInput): Observable<SendPasswordResetCodeResult> {
    return this.http.post<SendPasswordResetCodeResult>(`${environment.apiUrl}/auth/passwordResetCode`, input)
      .pipe(map((result: SendPasswordResetCodeResult) => {
        return result;
      }));
  }

  validatePasswordResetCode(input: ValidatePasswordResetCodeInput): Observable<ValidatePasswordResetCodeResult> {
    return this.http.post<ValidatePasswordResetCodeResult>(`${environment.apiUrl}/auth/passwordResetCodeValidation`, input)
      .pipe(map((result: ValidatePasswordResetCodeResult) => {
        return result;
      }));
  }

  changePassword(input: ChangePasswordInput): Observable<ChangePasswordResult> {
    return this.http.patch<ChangePasswordResult>(`${environment.apiUrl}/auth/passwordReset`, input)
      .pipe(map((result: ChangePasswordResult) => {
        return result;
      }));
  }

  logout(input?: LogoutInput): Observable<LogoutResult> {
    this.localService.clearToken();
    const result: LogoutResult = {
      success: !this.localService.getJsonValue('auth')
    };
    return observableOf(result);
  }

  getAuthenticatedUser(input?: GetAuthenticatedUserInput): Observable<AuthenticatedUserModel> {
    const auth = this.localService.getJsonValue('auth');
    const result: AuthenticatedUserModel = auth?.user as AuthenticatedUserModel;
    return observableOf(result);
  }

  confirmEmail(input: ConfirmEmailInput): Observable<ConfirmEmailResult> {
    return this.http.patch<ConfirmEmailResult>(`${environment.apiUrl}/auth/confirm`, input)
      .pipe(map((result: ConfirmEmailResult) => {
        return result;
      }));
  }
}
