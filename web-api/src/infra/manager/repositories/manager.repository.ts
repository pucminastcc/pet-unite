import {IManagerRepository} from '../../../domain/manager/repositories/imanager.repository';
import {GetUsersDto} from '../../../domain/manager/dtos/get-users.dto';
import {UserBaseResult} from '../../../domain/manager/models/results/user-base.result';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../../../domain/auth/models/user.model';
import {Injectable} from '@nestjs/common';
import {DeleteUserResult} from '../../../domain/manager/models/results/delete-user.result';
import {DeleteUserDto} from '../../../domain/manager/dtos/delete-user.dto';
import {GetUserAccountDto} from '../../../domain/manager/dtos/get-user-account.dto';
import {UserAccountResult} from '../../../domain/manager/models/results/user-account.result';
import {Report} from '../../../domain/manager/models/report.model';
import {ReportBaseResult} from '../../../domain/manager/models/results/report-base.result';
import {ReportType} from '../../../domain/config/models/report-type.model';
import {GetReportsDto} from '../../../domain/manager/dtos/get-reports.dto';
import {GetReportDto} from '../../../domain/manager/dtos/get-report.dto';
import {ReportResult} from '../../../domain/manager/models/results/report.result';
import {PersonType} from '../../../domain/config/models/person-type.model';
import {BrazilCity} from '../../../domain/config/models/brazil-city.model';

@Injectable()
export class ManagerRepository extends IManagerRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('PersonType') private readonly personTypeModel: Model<PersonType>,
        @InjectModel('BrazilCity') private readonly cityModel: Model<BrazilCity>,
        @InjectModel('Report') private readonly reportModel: Model<Report>,
        @InjectModel('ReportType') private readonly reportTypeModel: Model<ReportType>,
    ) {
        super();
    }

    async getUsers(input: GetUsersDto): Promise<UserBaseResult[]> {
        let result: UserBaseResult[] = [];
        const {id} = input;
        const users = await this.userModel.find({
            deleted: false
        }).exec();

        result = users.map((user: User) => {
            if(user.id !== id) {
                return {
                    id: user.id,
                    img: user.img,
                    username: user.username,
                    email: user.email,
                    isSuperUser: user.isSuperUser,
                    provider: user.provider,
                    blocked: user.blocked,
                }
            }
        }).filter((obj) => obj);
        return result;
    }

    async deleteUser(input: DeleteUserDto): Promise<DeleteUserResult> {
        let result: DeleteUserResult = {success: false};
        const {id} = input;

        const user = await this.userModel.findByIdAndUpdate(id, {
            deleted: true
        });

        if (user) {
            result.success = true;
        }
        return result;
    }

    async getUserAccount(input: GetUserAccountDto): Promise<UserAccountResult> {
        let result: UserAccountResult;
        const user = await this.userModel.findById(input.id).exec();
        if(user) {
            const personType = await this.personTypeModel.findById(user.personTypeId).exec();
            const city = user.cityId ? await this.cityModel.findById(user.cityId).exec() : undefined;

            result = {
                username: user.username,
                email: user.email,
                terms: user.terms,
                provider: user.provider,
                activated: user.activated,
                img: user.img,
                personType: personType.description,
                document: user.document ?? '',
                zipCode: user.zipCode ?? '',
                address: user.address ?? '',
                district: user.district ?? '',
                state: user.state ?? '',
                city: city ? city.description : '',
                complement: user.complement ?? '',
                phone: user.phone ?? '',
                cell: user.cell ?? '',
                whatsapp: user.whatsapp ?? '',
                isSuperUser: user.isSuperUser,
                blocked: user.blocked,
            };
        }
        return result;
    }

    async getReports(input: GetReportsDto): Promise<ReportBaseResult[]> {
        let result: ReportBaseResult[] = [];

        const reportTypes = await this.reportTypeModel.find().exec();
        const reports = await this.reportModel.find().exec();

        if(reports) {
            reports.forEach((report: Report) => {
                result.push({
                    id: report.id,
                    email: report.email,
                    username: report.username,
                    type: reportTypes.filter(e => e.id == report.reportTypeId).find(e => true).description,
                    subject: report.subject,
                    date: report.date
                })
            })
        }
        return result.reverse();
    }

    async getReport(input: GetReportDto): Promise<ReportResult> {
        let result: ReportResult;
        const {id} = input;

        const doc = await this.reportModel.findById(id).exec();
        if(doc) {
            const user = await this.userModel.findById(doc.userId).exec();
            const reportTypes = await this.reportTypeModel.find().exec();

            result = {
                img: user.img,
                username: user.username,
                email: user.email,
                type: reportTypes.filter(e => e.id == doc.reportTypeId).find(e => true).description,
                subject: doc.subject,
                description: doc.description,
                date: doc.date
            }
        }

        return result;
    }
}
