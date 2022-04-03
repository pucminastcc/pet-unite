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
import { GetUserAccountInput } from 'src/app/domain/manager/commands/inputs/get-user-account.input';
import { UserAccountResult } from 'src/app/domain/manager/models/results/user-account.result';
import {GetUserAccountCommand} from '../../../domain/manager/commands/get-user-account.command';
import {GetReportsCommand} from '../../../domain/manager/commands/get-reports.command';
import {GetReportsInput} from '../../../domain/manager/commands/inputs/get-reports.input';
import {ReportBaseResult} from '../../../domain/manager/models/results/report-base.result';
import {GetReportInput} from '../../../domain/manager/commands/inputs/get-report.input';
import {ReportResult} from '../../../domain/manager/models/results/report.result';
import {GetReportCommand} from '../../../domain/manager/commands/get-report.command';

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
}
