import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetReportInput} from './inputs/get-report.input';
import {ReportResult} from '../models/results/report.result';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetReportCommand implements Command<GetReportInput, ReportResult> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetReportInput): Observable<ReportResult> {
    return this.repos.getReport(params);
  }
}
