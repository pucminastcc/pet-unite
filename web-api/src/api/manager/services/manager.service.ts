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

@Injectable()
export class ManagerService implements IManagerRepository{
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
}
