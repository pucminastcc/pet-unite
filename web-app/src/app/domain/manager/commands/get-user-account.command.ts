import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetUserAccountInput} from './inputs/get-user-account.input';
import {UserAccountResult} from '../models/results/user-account.result';
import {Observable} from 'rxjs';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';

@Injectable({
  providedIn: 'root'
})
export class GetUserAccountCommand implements Command<GetUserAccountInput, UserAccountResult>{
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetUserAccountInput): Observable<UserAccountResult> {
    return this.repos.getUserAccount(params);
  }
}
