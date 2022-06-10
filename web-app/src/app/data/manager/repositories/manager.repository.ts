import {IManagerRepository} from '../../../domain/manager/repositories/imanager.repository';
import {Observable} from 'rxjs';
import {GetUsersInput} from '../../../domain/manager/commands/inputs/get-users.input';
import {UserBaseResult} from '../../../domain/manager/models/results/user-base.result';
import {ApiDatasource} from '../../datasources/api.datasource';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {DeleteUserInput} from '../../../domain/manager/commands/inputs/delete-user.input';
import {DeleteUserResult} from '../../../domain/manager/models/results/delete-user.result';
import {GetUserAccountInput} from '../../../domain/manager/commands/inputs/get-user-account.input';
import {UserAccountResult} from '../../../domain/manager/models/results/user-account.result';
import {GetReportsInput} from '../../../domain/manager/commands/inputs/get-reports.input';
import {ReportBaseResult} from '../../../domain/manager/models/results/report-base.result';
import {GetReportInput} from '../../../domain/manager/commands/inputs/get-report.input';
import {ReportResult} from '../../../domain/manager/models/results/report.result';
import {GetPermissionRequestsInput} from '../../../domain/manager/commands/inputs/get-permission-requests.input';
import {PermissionRequestBaseResult} from '../../../domain/manager/models/results/permission-request-base.result';
import {ReplyPermissionRequestInput} from 'src/app/domain/manager/commands/inputs/reply-permission-request.input';
import {ReplyPermissionRequestResult} from 'src/app/domain/manager/models/results/reply-permission-request.result';
import {GetContributionChartInput} from '../../../domain/manager/commands/inputs/get-contribution-chart.input';
import {GetDonationChartInput} from '../../../domain/manager/commands/inputs/get-donation-chart.input';
import {DonationChartResult} from 'src/app/domain/auth/models/results/donation-chart.result';
import {ContributionChartResult} from '../../../domain/manager/models/results/contribution-chart.result';

@Injectable({
  providedIn: 'root'
})
export class ManagerRepository extends IManagerRepository {

  constructor(
    private readonly api: ApiDatasource
  ) {
    super();
  }

  getUsers(input: GetUsersInput): Observable<UserBaseResult[]> {
    const {isInstitution, state, accessToken} = input;
    return this.api.get<UserBaseResult[]>(`${environment.apiUrl}/manager/users?isInstitution=${isInstitution}&state=${state}`, accessToken)
      .pipe(map((result: UserBaseResult[]) => {
        return result;
      }));
  }

  deleteUser(input: DeleteUserInput): Observable<DeleteUserResult> {
    const {id, accessToken} = input;
    return this.api.delete<DeleteUserResult>(`${environment.apiUrl}/manager/user?id=${id}`, accessToken)
      .pipe(map((result: DeleteUserResult) => {
        return result;
      }));
  }

  getUserAccount(input: GetUserAccountInput): Observable<UserAccountResult> {
    const {id, accessToken} = input;
    return this.api.get<UserAccountResult>(`${environment.apiUrl}/manager/user?id=${id}`, accessToken)
      .pipe(map((result: UserAccountResult) => {
        return result;
      }));
  }

  getReports(input: GetReportsInput): Observable<ReportBaseResult[]> {
    const {accessToken} = input;
    return this.api.get<ReportBaseResult[]>(`${environment.apiUrl}/manager/reports`, accessToken)
      .pipe(map((result: ReportBaseResult[]) => {
        return result;
      }));
  }

  getReport(input: GetReportInput): Observable<ReportResult> {
    const {id, accessToken} = input;
    return this.api.get<ReportResult>(`${environment.apiUrl}/manager/report?id=${id}`, accessToken)
      .pipe(map((result: ReportResult) => {
        return result;
      }));
  }

  getPermissionRequests(input: GetPermissionRequestsInput): Observable<PermissionRequestBaseResult[]> {
    const {accessToken} = input;
    return this.api.get<PermissionRequestBaseResult[]>(`${environment.apiUrl}/manager/requests`, accessToken)
      .pipe(map((result: PermissionRequestBaseResult[]) => {
        return result;
      }));
  }

  replyPermissionRequest(input: ReplyPermissionRequestInput): Observable<ReplyPermissionRequestResult> {
    const {accessToken} = input;
    return this.api.put<ReplyPermissionRequestResult>(`${environment.apiUrl}/manager/requests`, input, accessToken)
      .pipe(map((result: ReplyPermissionRequestResult) => {
        return result;
      }));
  }

  getDonationChart(input: GetDonationChartInput): Observable<DonationChartResult> {
    const {accessToken} = input;
    return this.api.get<DonationChartResult>(`${environment.apiUrl}/manager/donationChart`, accessToken)
      .pipe(map((result: DonationChartResult) => {
        return result;
      }));
  }

  getContributionChart(input: GetContributionChartInput): Observable<ContributionChartResult> {
    const {accessToken} = input;
    return this.api.get<ContributionChartResult>(`${environment.apiUrl}/manager/contributionChart`, accessToken)
      .pipe(map((result: ContributionChartResult) => {
        return result;
      }));
  }
}
