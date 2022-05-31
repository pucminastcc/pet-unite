import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {Observable} from 'rxjs';
import {ReplyPermissionRequestInput} from './inputs/reply-permission-request.input';
import {ReplyPermissionRequestResult} from '../models/results/reply-permission-request.result';

@Injectable({
  providedIn: 'root'
})
export class ReplyPermissionRequestCommand implements Command<ReplyPermissionRequestInput, ReplyPermissionRequestResult> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: ReplyPermissionRequestInput): Observable<ReplyPermissionRequestResult> {
    return this.repos.replyPermissionRequest(params);
  }
}
