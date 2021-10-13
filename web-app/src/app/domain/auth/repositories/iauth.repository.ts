import {Observable} from 'rxjs';
import {LoginInput} from '../commands/inputs/login.input';
import {LoginResult} from '../models/results/login.result';
import {RegisterInput} from '../commands/inputs/register.input';
import {RegisterResult} from '../models/results/register.result';
import {SendPasswordRecoveryInput} from '../commands/inputs/send-password-recovery.input';
import {SendPasswordRecoveryResult} from '../models/results/send-password-recovery.result';

export abstract class IAuthRepository {
  abstract login(input: LoginInput): Observable<LoginResult>;
  abstract register(input: RegisterInput): Observable<RegisterResult>;
  abstract sendPasswordRecovery(input: SendPasswordRecoveryInput): Observable<SendPasswordRecoveryResult>;
}
