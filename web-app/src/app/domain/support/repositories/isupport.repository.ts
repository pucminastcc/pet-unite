import {Observable} from 'rxjs';
import {SendReportInput} from '../commands/inputs/send-report.input';
import {SendReportResult} from '../models/results/send-report.result';

export abstract class ISupportRepository {
  abstract sendReport(input: SendReportInput): Observable<SendReportResult>;
}
