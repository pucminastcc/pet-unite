import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ReportResult} from '../../../../../../domain/manager/models/results/report.result';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ManagerService} from '../../../../services/manager.service';
import {AuthService} from '../../../../../auth/services/auth.service';
import {LogoutResult} from '../../../../../../domain/auth/models/results/logout.result';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {
  private getReportSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  private readonly id: string;
  public isLoading: boolean = true;
  public report: ReportResult | undefined;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private readonly managerService: ManagerService,
    private readonly authService: AuthService,
  ) {
    this.id = this.config.data.id;
  }

  ngOnInit(): void {
    this.getReportSubscription = this.managerService.getReport({
      id: this.id
    }).subscribe((data: ReportResult) => {
      if (data) {
        this.report = data;
      }
      this.isLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if(this.getReportSubscription) this.getReportSubscription.unsubscribe();
    if(this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  private logout(): void {
    this.logoutSubscription = this.authService.logout()
      .subscribe((data: LogoutResult) => {
        if (data) {
          if (data.success) {
            window.location.href = '/';
          }
        }
      });
  }

  public getModalHeight(): number {
    return this.getScreenHeight() - 320;
  }

  public isMobile(): boolean {
    return this.getScreenWidth() < 1024;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenHeight(): number {
    return window.innerHeight;
  }
}
