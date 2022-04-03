import {Injectable} from '@angular/core';
import {ISupportRepository} from '../../../domain/support/repositories/isupport.repository';
import {Observable} from 'rxjs';
import {SendReportInput} from '../../../domain/support/commands/inputs/send-report.input';
import {SendReportResult} from '../../../domain/support/models/results/send-report.result';
import {SendReportCommand} from '../../../domain/support/commands/send-report.command';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService implements ISupportRepository{

  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly sendReportCommand: SendReportCommand
  ) {
    this.accessToken = this.authService.getToken();
  }

  sendReport(input: SendReportInput): Observable<SendReportResult> {
    return this.sendReportCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
