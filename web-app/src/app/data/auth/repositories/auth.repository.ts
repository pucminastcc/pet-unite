import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginInput} from '../../../domain/auth/commands/inputs/login.input';
import {Observable} from 'rxjs';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {LocalService} from '../../../ui/shared/services/local.service';
import {RegisterInput} from '../../../domain/auth/commands/inputs/register.input';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {SendPasswordRecoveryInput} from '../../../domain/auth/commands/inputs/send-password-recovery.input';
import {SendPasswordRecoveryResult} from '../../../domain/auth/models/results/send-password-recovery.result';

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
          // this.localService.decodePayloadJwt(login.accessToken);
          this.localService.setJsonValue('auth', JSON.stringify(result));
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

  sendPasswordRecovery(input: SendPasswordRecoveryInput): Observable<SendPasswordRecoveryResult> {
    return this.http.post<SendPasswordRecoveryResult>(`${environment.apiUrl}/auth/passwordRecovery`, input)
      .pipe(map((result: SendPasswordRecoveryResult) => {
        return result;
      }));
  }
}
