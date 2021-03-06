import {Injectable} from '@nestjs/common';
import {IManagerRepository} from '../../../domain/manager/repositories/imanager.repository';
import {GetUsersDto} from '../../../domain/manager/dtos/get-users.dto';
import {UserBaseResult} from '../../../domain/manager/models/results/user-base.result';
import {ManagerRepository} from '../../../infra/manager/repositories/manager.repository';
import {DeleteUserResult} from '../../../domain/manager/models/results/delete-user.result';
import {DeleteUserDto} from '../../../domain/manager/dtos/delete-user.dto';
import {GetUserAccountDto} from '../../../domain/manager/dtos/get-user-account.dto';
import {UserAccountResult} from '../../../domain/manager/models/results/user-account.result';
import {ReportBaseResult} from '../../../domain/manager/models/results/report-base.result';
import {GetReportsDto} from '../../../domain/manager/dtos/get-reports.dto';
import {GetReportDto} from '../../../domain/manager/dtos/get-report.dto';
import {ReportResult} from '../../../domain/manager/models/results/report.result';
import {GetPermissionRequestsDto} from '../../../domain/manager/dtos/get-permission-requests.dto';
import {ReplyPermissionRequestDto} from '../../../domain/manager/dtos/reply-permission-request.dto';
import {ReplyPermissionRequestResult} from '../../../domain/manager/models/results/reply-permission-request.result';
import {PermissionRequestBaseResult} from '../../../domain/manager/models/results/permission-request-base.result';
import { GetDonationChartDto } from 'src/domain/manager/dtos/get-donation-chart.dto';
import {DonationChartResult} from '../../../domain/manager/models/results/donation-chart.result';
import {ContributionChartResult} from '../../../domain/manager/models/results/contribution-chart.result';
import {GetContributionChartDto} from '../../../domain/manager/dtos/get-contribution-chart.dto';

@Injectable()
export class ManagerService implements IManagerRepository {
    constructor(
        private readonly repository: ManagerRepository
    ) {
    }

    async getUsers(input: GetUsersDto): Promise<UserBaseResult[]> {
        return await this.repository.getUsers(input);
    }

    async deleteUser(input: DeleteUserDto): Promise<DeleteUserResult> {
        return await this.repository.deleteUser(input);
    }

    async getUserAccount(input: GetUserAccountDto): Promise<UserAccountResult> {
        return await this.repository.getUserAccount(input);
    }

    async getReports(input: GetReportsDto): Promise<ReportBaseResult[]> {
        return await this.repository.getReports(input);
    }

    async getReport(input: GetReportDto): Promise<ReportResult> {
        return await this.repository.getReport(input);
    }

    async getPermissionRequests(input: GetPermissionRequestsDto): Promise<PermissionRequestBaseResult[]> {
        return await this.repository.getPermissionRequests(input);
    }

    async replyPermissionRequest(input: ReplyPermissionRequestDto): Promise<ReplyPermissionRequestResult> {
        return await this.repository.replyPermissionRequest(input);
    }

    async getDonationChart(input: GetDonationChartDto): Promise<DonationChartResult> {
        return await this.repository.getDonationChart(input);
    }

    async getContributionChart(input: GetContributionChartDto): Promise<ContributionChartResult> {
        return await this.repository.getContributionChart(input);
    }
}
