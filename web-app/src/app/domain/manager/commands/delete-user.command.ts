import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {DeleteUserInput} from './inputs/delete-user.input';
import {DeleteUserResult} from '../models/results/delete-user.result';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserCommand implements Command<DeleteUserInput, DeleteUserResult> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: DeleteUserInput): Observable<DeleteUserResult> {
    return this.repos.deleteUser(params);
  }
}
