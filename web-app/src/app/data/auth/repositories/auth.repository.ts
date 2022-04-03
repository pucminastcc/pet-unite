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
import {GetTokenInput} from '../../../domain/auth/commands/inputs/get-token.input';
import {ApiDatasource} from '../../datasources/api.datasource';
import {UpdateUserInput} from '../../../domain/auth/commands/inputs/update-user.input';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {GetUserInput} from '../../../domain/auth/commands/inputs/get-user.input';
import {GetUserResult} from '../../../domain/auth/models/results/get-user.result';
import {LoginFacebookInput} from '../../../domain/auth/commands/inputs/login-facebook.input';
import {LoginGoogleInput} from '../../../domain/auth/commands/inputs/login-google.input';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository extends IAuthRepository {

  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiDatasource,
    private readonly localService: LocalService
  ) {
    super();
  }

  private setAuthValue(accessToken: string, user: AuthenticatedUserModel): void {
    const authValue = {accessToken, user};
    this.localService.setJsonValue('auth', JSON.stringify(authValue));
  }

  login(input: LoginInput): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/login`, input)
      .pipe(map((result: LoginResult) => {
        if (result.accessToken) {
          const {accessToken, user} = result;
          this.setAuthValue(accessToken, user);
          // this.localService.decodePayloadJwt(result.accessToken);
        }
        return result;
      }));
  }

  loginFacebok(input: LoginFacebookInput): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/facebook`, input)
      .pipe(map((result: LoginResult) => {
        if (result.accessToken) {
          const {accessToken, user} = result;
          this.setAuthValue(accessToken, user);
          // this.localService.decodePayloadJwt(result.accessToken);
        }
        return result;
      }));
  }

  loginGoogle(input: LoginGoogleInput): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/google`, input)
      .pipe(map((result: LoginResult) => {
        if (result.accessToken) {
          const {accessToken, user} = result;
          this.setAuthValue(accessToken, user);
          // this.localService.decodePayloadJwt(result.accessToken);
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
    if (input?.accessToken) {
      const {accessToken, user} = input;
      this.setAuthValue(accessToken, user);
    }

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

  getToken(input?: GetTokenInput): string {
    const auth = this.localService.getJsonValue('auth');
    return auth?.accessToken as string;
  }

  getUser(input: GetUserInput): Observable<GetUserResult> {
    const {accessToken} = input;
    return this.api.get<GetUserResult>(`${environment.apiUrl}/auth/user`, accessToken)
      .pipe(map((result: GetUserResult) => {
        return result;
      }));
  }

  updateUser(input: UpdateUserInput): Observable<UpdateUserResult> {
    const {accessToken} = input;
    return this.api.put<UpdateUserResult>(`${environment.apiUrl}/auth/user`, input, accessToken)
      .pipe(map((result: UpdateUserResult) => {
        return result;
      }));
  }
}
