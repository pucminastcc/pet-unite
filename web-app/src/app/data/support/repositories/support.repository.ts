import {Injectable} from '@angular/core';
import {ApiDatasource} from '../../datasources/api.datasource';
import {ISupportRepository} from '../../../domain/support/repositories/isupport.repository';
import {SendReportInput} from '../../../domain/support/commands/inputs/send-report.input';
import {Observable} from 'rxjs';
import {SendReportResult} from '../../../domain/support/models/results/send-report.result';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupportRepository extends ISupportRepository {
  constructor(
    private readonly api: ApiDatasource
  ) {
    super();
  }

  sendReport(input: SendReportInput): Observable<SendReportResult> {
    const {accessToken} = input;
    return this.api.post<SendReportResult>(`${environment.apiUrl}/support`, input, accessToken)
      .pipe(map((result: SendReportResult) => {
        return result;
      }));
  }
}
