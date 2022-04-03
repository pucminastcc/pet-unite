import {Command} from '../../../core/base/command';
import {SendReportInput} from './inputs/send-report.input';
import {SendReportResult} from '../models/results/send-report.result';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SupportRepository} from '../../../data/support/repositories/support.repository';

@Injectable({
  providedIn: 'root'
})
export class SendReportCommand implements Command<SendReportInput, SendReportResult>{
  constructor(
    private readonly repos: SupportRepository
  ) {
  }

  execute(params: SendReportInput): Observable<SendReportResult> {
    return this.repos.sendReport(params);
  }
}
