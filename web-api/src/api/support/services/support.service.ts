import {Injectable} from '@nestjs/common';
import {SupportRepository} from '../../../infra/support/repositories/support.repository';
import {ISupportRepository} from '../../../domain/support/repositories/isupport.repository';
import {SendReportDto} from '../../../domain/support/dtos/send-report.dto';
import {SendReportResult} from '../../../domain/support/models/results/send-report.result';

@Injectable()
export class SupportService implements ISupportRepository {
    constructor(
        private readonly repository: SupportRepository
    ) {
    }

    async sendReport(dto: SendReportDto): Promise<SendReportResult> {
        return await this.repository.sendReport(dto);
    }
}
