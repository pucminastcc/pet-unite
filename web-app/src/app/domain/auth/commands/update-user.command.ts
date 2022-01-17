import {Command} from '../../../core/base/command';
import {UpdateUserResult} from '../models/results/update-user.result';
import {UpdateUserInput} from './inputs/update-user.input';
import {Observable} from 'rxjs';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserCommand implements Command<UpdateUserInput, UpdateUserResult> {
  constructor(
    private readonly repo: AuthRepository
  ) {
  }

  execute(params: UpdateUserInput): Observable<UpdateUserResult> {
    return this.repo.updateUser(params);
  }
}
