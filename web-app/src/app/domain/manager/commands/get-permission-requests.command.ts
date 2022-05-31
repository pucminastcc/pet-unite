import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {Observable} from 'rxjs';
import {GetPermissionRequestsInput} from './inputs/get-permission-requests.input';
import {PermissionRequestBaseResult} from '../models/results/permission-request-base.result';

@Injectable({
  providedIn: 'root'
})
export class GetPermissionRequestsCommand implements Command<GetPermissionRequestsInput, PermissionRequestBaseResult[]> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetPermissionRequestsInput): Observable<PermissionRequestBaseResult[]> {
    return this.repos.getPermissionRequests(params);
  }
}
