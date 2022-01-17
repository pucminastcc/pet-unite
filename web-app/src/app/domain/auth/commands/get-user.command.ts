import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetUserInput} from './inputs/get-user.input';
import {GetUserResult} from '../models/results/get-user.result';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserCommand implements Command<GetUserInput, GetUserResult> {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params: GetUserInput): Observable<GetUserResult> {
    return this.repos.getUser(params);
  }
}
