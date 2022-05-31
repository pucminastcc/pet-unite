import {Observable} from 'rxjs';
import {GetUsersInput} from '../commands/inputs/get-users.input';
import {UserBaseResult} from '../models/results/user-base.result';
import {DeleteUserInput} from '../commands/inputs/delete-user.input';
import {DeleteUserResult} from '../models/results/delete-user.result';
import {GetUserAccountInput} from '../commands/inputs/get-user-account.input';
import {UserAccountResult} from '../models/results/user-account.result';
import {GetReportsInput} from '../commands/inputs/get-reports.input';
import {ReportBaseResult} from '../models/results/report-base.result';
import {ReportResult} from '../models/results/report.result';
import {GetReportInput} from '../commands/inputs/get-report.input';
import {PermissionRequestBaseResult} from '../models/results/permission-request-base.result';
import {GetPermissionRequestsInput} from '../commands/inputs/get-permission-requests.input';
import {ReplyPermissionRequestInput} from '../commands/inputs/reply-permission-request.input';
import {ReplyPermissionRequestResult} from '../models/results/reply-permission-request.result';

export abstract class IManagerRepository {
  abstract getUsers(input?: GetUsersInput): Observable<UserBaseResult[]>;
  abstract deleteUser(input: DeleteUserInput): Observable<DeleteUserResult>;
  abstract getUserAccount(input: GetUserAccountInput): Observable<UserAccountResult>;
  abstract getReports(input: GetReportsInput): Observable<ReportBaseResult[]>;
  abstract getReport(input: GetReportInput): Observable<ReportResult>;
  abstract getPermissionRequests(input: GetPermissionRequestsInput): Observable<PermissionRequestBaseResult[]>;
  abstract replyPermissionRequest(input: ReplyPermissionRequestInput): Observable<ReplyPermissionRequestResult>;
}
