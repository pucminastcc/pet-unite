import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {ISupportForm} from '../../../../domain/support/models/forms/isupport.form';
import {FormControl, Validators} from '@angular/forms';
import {forkJoin, Subscription} from 'rxjs';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../auth/services/auth.service';
import {ConfigService} from '../../../shared/services/config.service';
import {MessageService, SelectItem} from 'primeng/api';
import {ReportTypeResult} from '../../../../domain/shared/services/models/results/report-type.result';
import {SupportService} from '../../services/support.service';
import {SendReportResult} from '../../../../domain/support/models/results/send-report.result';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription | undefined;
  private forkSubscription: Subscription | undefined;
  private sendReportSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  private user: AuthenticatedUserModel | undefined;
  public supportForm: FormGroupTypeSafe<ISupportForm>;
  public optReportTypes: SelectItem<ReportTypeResult>[] = [];
  public text: string | undefined;
  public submitted: boolean = false;
  public isLoading: boolean = true;

  constructor(
    private readonly fb: FormBuilderTypeSafe,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly supportService: SupportService,
    private readonly messageService: MessageService
  ) {
    this.authSubscription = this.getAuthenticathedUser();
    this.supportForm = this.fb.group<ISupportForm>({
      reportTypeId: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required, Validators.maxLength(125)]),
      description: new FormControl('', [Validators.required])
    });
  }

  get sf() {
    return this.supportForm?.controls;
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  private getAuthenticathedUser(): Subscription {
    return this.authService.getAuthenticatedUser()
      .subscribe((data: AuthenticatedUserModel) => {
        if (data) {
          this.user = data;
        }
      });
  }

  private getDataFromApi(): Subscription {
    return forkJoin({
      reportTypes: this.configService.getReportTypes()
    }).subscribe((res) => {
      if (res) {
        this.optReportTypes = this.getOptReportTypes(res.reportTypes);
      }
      this.isLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isLoading = false;
    });
  }

  private getOptReportTypes(reportTypes: ReportTypeResult[]): SelectItem<ReportTypeResult>[] {
    return reportTypes.map((reportType: ReportTypeResult) => {
      return {
        label: reportType.description,
        value: reportType
      }
    })
  }

  public changeReportType(event: any): void {
  }

  public trySend(): void {
    this.submitted = true;
    if (this.supportForm.invalid) {
      return;
    }

    this.sendReportSubscription = this.sendReport(this.supportForm);
  }

  public setUpperCase(): void {
    this.sf?.subject.setValue(this.sf?.subject.value.toUpperCase());
  }

  private sendReport(form: FormGroupTypeSafe<ISupportForm>): Subscription {
    this.isLoading = true;
    const {subject, reportTypeId, description} = form.value;
    return this.supportService.sendReport({
      subject,
      reportTypeId,
      description
    }).pipe(finalize(() => {
      this.isLoading = false;
      this.submitted = false;
    })).subscribe((data: SendReportResult) => {
      if (data) {
        this.messageService.add({
          severity: data.success ? 'success' : 'error',
          summary: '',
          detail: data.message
        })
        this.supportForm.reset();
        this.text = null;
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.forkSubscription) this.forkSubscription.unsubscribe();
    if (this.sendReportSubscription) this.sendReportSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  public logout(): void {
    this.logoutSubscription = this.authService.logout()
      .subscribe((data: LogoutResult) => {
        if (data) {
          if (data.success) {
            window.location.href = '/';
          }
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }
}
