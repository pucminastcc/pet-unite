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
import {GetPermissionRequestsDto} from '../dtos/get-permission-requests.dto';
import {ReplyPermissionRequestDto} from '../dtos/reply-permission-request.dto';
import {ReplyPermissionRequestResult} from '../models/results/reply-permission-request.result';
import {PermissionRequestBaseResult} from '../models/results/permission-request-base.result';
import {GetDonationChartDto} from '../dtos/get-donation-chart.dto';
import {DonationChartResult} from '../models/results/donation-chart.result';
import {ContributionChartResult} from '../models/results/contribution-chart.result';
import {GetContributionChartDto} from '../dtos/get-contribution-chart.dto';

export abstract class IManagerRepository {
    abstract getUsers(input: GetUsersDto): Promise<UserBaseResult[]>

    abstract deleteUser(input: DeleteUserDto): Promise<DeleteUserResult>

    abstract getUserAccount(input: GetUserAccountDto): Promise<UserAccountResult>

    abstract getReports(input: GetReportsDto): Promise<ReportBaseResult[]>

    abstract getReport(input: GetReportDto): Promise<ReportResult>

    abstract getPermissionRequests(input: GetPermissionRequestsDto): Promise<PermissionRequestBaseResult[]>

    abstract replyPermissionRequest(input: ReplyPermissionRequestDto): Promise<ReplyPermissionRequestResult>

    abstract getDonationChart(input: GetDonationChartDto): Promise<DonationChartResult>

    abstract getContributionChart(input: GetContributionChartDto): Promise<ContributionChartResult>
}
