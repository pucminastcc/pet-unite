import {ISupportRepository} from '../../../domain/support/repositories/isupport.repository';
import {SendReportDto} from '../../../domain/support/dtos/send-report.dto';
import {SendReportResult} from '../../../domain/support/models/results/send-report.result';
import {Model} from 'mongoose';
import {Report} from '../../../domain/manager/models/report.model';
import {InjectModel} from '@nestjs/mongoose';
import {Injectable} from '@nestjs/common';
import {SendReportMessage} from '../../../domain/support/enums/send-report-message.enum';

@Injectable()
export class SupportRepository extends ISupportRepository {
    constructor(
        @InjectModel('Report') private readonly reportsModel: Model<Report>
    ) {
        super();
    }

    async sendReport(dto: SendReportDto): Promise<SendReportResult> {
        let result: SendReportResult = {success: false, message: SendReportMessage.Error};
        const doc = this.reportsModel.insertMany(dto);

        if (doc) {
            result = {success: true, message: SendReportMessage.Success}
        }
        return result;
    }
}
