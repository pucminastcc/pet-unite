import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {RegisterInput} from './inputs/register.input';
import {RegisterResult} from '../models/results/register.result';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class RegisterCommand implements Command<RegisterInput, RegisterResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: RegisterInput): Observable<RegisterResult> {
    return this.repos.register(params);
  }
}
