import {Injectable} from '@angular/core';
import {Command} from '../../../core/base/command';
import {GetReportsInput} from './inputs/get-reports.input';
import {ReportBaseResult} from '../models/results/report-base.result';
import {ManagerRepository} from '../../../data/manager/repositories/manager.repository';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetReportsCommand implements Command<GetReportsInput, ReportBaseResult[]> {
  constructor(
    private readonly repos: ManagerRepository
  ) {
  }

  execute(params: GetReportsInput): Observable<ReportBaseResult[]> {
    return this.repos.getReports(params);
  }
}
