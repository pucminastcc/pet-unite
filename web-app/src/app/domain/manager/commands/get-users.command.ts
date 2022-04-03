import {Command} from '../../../core/base/command';
import {Injectable} from '@angular/core';
import {GetUsersInput} from './inputs/get-users.input';
import {UserBaseResult} from '../models/results/user-base.result';
import {Observable} from 'rxjs';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';

@Injectable({
  providedIn: 'root'
})
export class GetUsersCommand implements Command<GetUsersInput, UserBaseResult[]> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetUsersInput): Observable<UserBaseResult[]> {
    return this.repos.getUsers(params);
  }
}
