import {SendReportDto} from '../dtos/send-report.dto';
import {SendReportResult} from '../models/results/send-report.result';

export abstract class ISupportRepository {
    abstract sendReport(dto: SendReportDto): Promise<SendReportResult>;
}
