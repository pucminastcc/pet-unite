import {Injectable} from '@angular/core';
import {Command} from '../../../../core/base/command';
import {GetReportTypesInput} from './inputs/get-report-types.input';
import {ReportTypeResult} from '../models/results/report-type.result';
import {Observable} from 'rxjs';
import {ConfigRepository} from '../../../../data/shared/repositories/config-repository';

@Injectable({
  providedIn: 'root'
})
export class GetReportTypesCommand implements Command<GetReportTypesInput, ReportTypeResult[]> {
  constructor(
    private readonly repos: ConfigRepository
  ) {
  }

  execute(params: GetReportTypesInput): Observable<ReportTypeResult[]> {
    return this.repos.getReportTypes(params);
  }
}
