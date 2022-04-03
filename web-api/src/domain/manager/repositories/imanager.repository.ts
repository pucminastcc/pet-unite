import {GetUsersDto} from '../dtos/get-users.dto';
import {UserBaseResult} from '../models/results/user-base.result';
import {DeleteUserResult} from '../models/results/delete-user.result';
import {DeleteUserDto} from '../dtos/delete-user.dto';
import {GetUserAccountDto} from '../dtos/get-user-account.dto';
import {UserAccountResult} from '../models/results/user-account.result';
import {ReportBaseResult} from '../models/results/report-base.result';
import {GetReportsDto} from '../dtos/get-reports.dto';
import {GetReportDto} from '../dtos/get-report.dto';
import {ReportResult} from '../models/results/report.result';

export abstract class IManagerRepository {
    abstract getUsers(input: GetUsersDto): Promise<UserBaseResult[]>

    abstract deleteUser(input: DeleteUserDto): Promise<DeleteUserResult>

    abstract getUserAccount(input: GetUserAccountDto): Promise<UserAccountResult>

    abstract getReports(input: GetReportsDto): Promise<ReportBaseResult[]>

    abstract getReport(input: GetReportDto): Promise<ReportResult>
}
