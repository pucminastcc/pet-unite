import {Injectable} from '@angular/core';
import {IManagerRepository} from '../../../domain/manager/repositories/imanager.repository';
import {AuthService} from '../../auth/services/auth.service';
import {GetUsersInput} from '../../../domain/manager/commands/inputs/get-users.input';
import {Observable} from 'rxjs';
import {UserBaseResult} from '../../../domain/manager/models/results/user-base.result';
import {GetUsersCommand} from '../../../domain/manager/commands/get-users.command';
import {DeleteUserInput} from '../../../domain/manager/commands/inputs/delete-user.input';
import {DeleteUserResult} from '../../../domain/manager/models/results/delete-user.result';
import {DeleteUserCommand} from '../../../domain/manager/commands/delete-user.command';
import {GetUserAccountInput} from 'src/app/domain/manager/commands/inputs/get-user-account.input';
import {UserAccountResult} from 'src/app/domain/manager/models/results/user-account.result';
import {GetUserAccountCommand} from '../../../domain/manager/commands/get-user-account.command';
import {GetReportsCommand} from '../../../domain/manager/commands/get-reports.command';
import {GetReportsInput} from '../../../domain/manager/commands/inputs/get-reports.input';
import {ReportBaseResult} from '../../../domain/manager/models/results/report-base.result';
import {GetReportInput} from '../../../domain/manager/commands/inputs/get-report.input';
import {ReportResult} from '../../../domain/manager/models/results/report.result';
import {GetReportCommand} from '../../../domain/manager/commands/get-report.command';
import {PermissionRequestBaseResult} from 'src/app/domain/manager/models/results/permission-request-base.result';
import {GetPermissionRequestsInput} from '../../../domain/manager/commands/inputs/get-permission-requests.input';
import {GetPermissionRequestsCommand} from '../../../domain/manager/commands/get-permission-requests.command';
import {ReplyPermissionRequestInput} from '../../../domain/manager/commands/inputs/reply-permission-request.input';
import {ReplyPermissionRequestResult} from '../../../domain/manager/models/results/reply-permission-request.result';
import {ReplyPermissionRequestCommand} from '../../../domain/manager/commands/reply-permission-request.command';
import {GetDonationChartInput} from '../../../domain/manager/commands/inputs/get-donation-chart.input';
import {DonationChartResult} from '../../../domain/manager/models/results/donation-chart.result';
import {ContributionChartResult} from '../../../domain/manager/models/results/contribution-chart.result';
import {GetContributionChartInput} from '../../../domain/manager/commands/inputs/get-contribution-chart.input';
import {GetDonationChartCommand} from '../../../domain/manager/commands/get-donation-chart.command';
import {GetContributionChartCommand} from '../../../domain/manager/commands/get-contribution-chart.command';

@Injectable({
  providedIn: 'root'
})
export class ManagerService implements IManagerRepository {
  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly getUsersCommand: GetUsersCommand,
    private readonly deleteUserCommand: DeleteUserCommand,
    private readonly getUserAccountCommand: GetUserAccountCommand,
    private readonly getReportsCommand: GetReportsCommand,
    private readonly getReportCommand: GetReportCommand,
    private readonly getPermissionRequestsCommand: GetPermissionRequestsCommand,
    private readonly replyPermissionRequestCommand: ReplyPermissionRequestCommand,
    private readonly getDonationChartCommand: GetDonationChartCommand,
    private readonly getContributionChartCommand: GetContributionChartCommand,
  ) {
    this.accessToken = this.authService.getToken();
  }

  getUsers(input?: GetUsersInput): Observable<UserBaseResult[]> {
    return this.getUsersCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  deleteUser(input: DeleteUserInput): Observable<DeleteUserResult> {
    return this.deleteUserCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getUserAccount(input: GetUserAccountInput): Observable<UserAccountResult> {
    return this.getUserAccountCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getReports(input?: GetReportsInput): Observable<ReportBaseResult[]> {
    return this.getReportsCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getReport(input: GetReportInput): Observable<ReportResult> {
    return this.getReportCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getPermissionRequests(input?: GetPermissionRequestsInput): Observable<PermissionRequestBaseResult[]> {
    return this.getPermissionRequestsCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  replyPermissionRequest(input: ReplyPermissionRequestInput): Observable<ReplyPermissionRequestResult> {
    return this.replyPermissionRequestCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getDonationChart(input?: GetDonationChartInput): Observable<DonationChartResult> {
    return this.getDonationChartCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getContributionChart(input?: GetContributionChartInput): Observable<ContributionChartResult> {
    return this.getContributionChartCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
