import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth/services/auth.service';
import {ManagerService} from '../../services/manager.service';
import {AbstractControlTypeSafe, FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {UserBaseResult} from '../../../../domain/manager/models/results/user-base.result';
import {ReportBaseResult} from '../../../../domain/manager/models/results/report-base.result';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {finalize} from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import {ReportComponent} from './components/report/report.component';
import {PermissionRequestBaseResult} from '../../../../domain/manager/models/results/permission-request-base.result';
import {DeleteUserResult} from '../../../../domain/manager/models/results/delete-user.result';
import {UserAccountComponent} from './components/user-account/user-account.component';
import {ReplyPermissionRequestResult} from '../../../../domain/manager/models/results/reply-permission-request.result';
import {FormControl} from '@angular/forms';
import {ConfigService} from '../../../shared/services/config.service';
import {StateResult} from '../../../../domain/shared/services/models/results/state.result';
import {DonationChartResult} from '../../../../domain/auth/models/results/donation-chart.result';
import {ContributionChartResult} from '../../../../domain/auth/models/results/contribution-chart.result';

enum TabViewIndex {
  Users = 0,
  Reports = 1,
  PermissionRequests = 2,
  Charts = 3,
}

enum Provider {
  Application = 'application',
  Google = 'google',
  Facebook = 'facebook',
}

interface FormFilter {
  state: string;
  role: boolean;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  private getUsersSubscription: Subscription | undefined;
  private getReportsSubscription: Subscription | undefined;
  private getPermissionRequestsSubscription: Subscription | undefined;
  private getChartsSubscription: Subscription | undefined;
  private deleteUserSubscription: Subscription | undefined;
  private replyPermissionRequestSubscription: Subscription | undefined;
  private getDonationChartSubscription: Subscription;
  private getContributionChartSubscription: Subscription;
  private logoutSubscription: Subscription | undefined;

  public tabViewIndex = TabViewIndex;

  public formFilter: FormGroupTypeSafe<FormFilter>;

  public optRoles: SelectItem[] = [];
  public optStates: SelectItem[] = [];

  public user: AuthenticatedUserModel | undefined;
  public users: UserBaseResult[] = [];
  public reports: ReportBaseResult[] = [];
  public permissionRequests: PermissionRequestBaseResult[] = [];

  public isLoading: boolean = false;
  public activeIndex: number = 0;

  public isLoadingDonationData: boolean = false;
  public isLoadingContributionData: boolean = false;

  public currentYear: number = new Date().getFullYear();
  private labels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  private donationData: number[] = [];
  private adoptionData: number[] = [];
  private contributionData: number[] = [];

  public donationChartData: any;
  public contributionChartData: any;
  public basicOptions: any = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        }
      }
    }
  };

  private exportColumns: { dataKey: string; title: string }[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly managerService: ManagerService,
    private readonly configService: ConfigService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
  ) {
    this.formFilter = this.fb.group<FormFilter>({
      state: new FormControl(''),
      role: new FormControl(null)
    });

    this.authSubscription = this.authService.getAuthenticatedUser()
      .subscribe((result: AuthenticatedUserModel) => {
        if (result) {
          this.user = result;
        }
      });
  }

  get ff() {
    return this.formFilter.controls;
  }

  ngOnInit(): void {
    this.configService.getStates()
      .subscribe((result: StateResult[]) => {
        if (result) {
          this.optStates = result.map((state: StateResult) => {
            return {
              label: state.description, value: state.initials
            };
          });

          this.optRoles = [
            {label: 'Usuário', value: false},
            {label: 'Instituição', value: true},
          ];
        }
      });

    this.getUsers();
  }

  public getUsers(): void {
    const {state, role} = this.formFilter.value;

    this.isLoading = true;
    this.getUsersSubscription = this.managerService.getUsers({
      isInstitution: role ?? false,
      state: state ?? ''
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: UserBaseResult[]) => {
        if (result) {
          this.users = result;
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao processar a solicitação, tente novamente!'
          });
      });
  }

  private getReports(): void {
    this.isLoading = true;
    this.getReportsSubscription = this.managerService.getReports()
      .pipe(
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe((result: ReportBaseResult[]) => {
        if (result) {
          this.reports = result;
          const reportCols = [
            {field: 'username', header: 'Usuário'},
            {field: 'email', header: 'Email'},
            {field: 'type', header: 'Tipo'},
            {field: 'subject', header: 'Assunto'},
            {field: 'date', header: 'Data'},
          ];
          this.exportColumns = reportCols.map(col => ({title: col.header, dataKey: col.field}));
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao processar a solicitação, tente novamente!'
          });
      });
  }

  private getPermissionRequests(): void {
    this.isLoading = true;
    this.getUsersSubscription = this.managerService.getPermissionRequests()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: PermissionRequestBaseResult[]) => {
        if (result) {
          this.permissionRequests = result;
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao processar a solicitação, tente novamente!'
          });
      });
  }

  private getDonationChart(): void {
    this.isLoadingDonationData = true;
    this.getDonationChartSubscription = this.managerService.getDonationChart()
      .pipe(
        finalize(() => {
          this.isLoadingDonationData = false;
        })
      )
      .subscribe((result: DonationChartResult) => {
        if (result) {
          this.labels.forEach((label: string) => {
            const donation = result.donations.find((donation: { count: number, month: string }) => donation.month === label);
            this.donationData.push(donation ? donation.count : 0);

            const adoption = result.adoptions.find((adoption: { count: number, month: string }) => adoption.month === label);
            this.adoptionData.push(adoption ? adoption.count : 0);
          });

          this.updateDonationChartData();
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  private updateDonationChartData(): void {
    this.donationChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Doações',
          data: this.donationData,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Adoções',
          data: this.adoptionData,
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
  }

  private getContributionChart(): void {
    this.isLoadingContributionData = true;
    this.getContributionChartSubscription = this.managerService.getContributionChart()
      .pipe(
        finalize(() => {
          this.isLoadingContributionData = false;
        })
      )
      .subscribe((result: ContributionChartResult) => {
        if (result) {
          this.labels.forEach((label: string) => {
            const contribution = result.contributions.find((contribution: { count: number, month: string }) => contribution.month === label);
            this.contributionData.push(contribution ? contribution.count : 0);
          });

          this.updateContributionChartData();
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  private updateContributionChartData(): void {
    this.contributionChartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Contribuições',
          data: this.contributionData,
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }

  private deleteUser(id: string): void {
    this.deleteUserSubscription = this.managerService.deleteUser({
      id
    })
      .subscribe((result: DeleteUserResult) => {
        if (result) {
          if (result.success) {
            const toDelete = new Set([id]);
            this.users = this.users.filter(obj => !toDelete.has(obj.id));
          }
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao processar a solicitação, tente novamente!'
          });
      });
  }

  private replyPermissionRequest(id: string, confirm: boolean): void {
    this.replyPermissionRequestSubscription = this.managerService.replyPermissionRequest({
      id, confirm
    })
      .subscribe((result: ReplyPermissionRequestResult) => {
        if (result) {
          const toDelete = new Set([id]);
          this.permissionRequests = this.permissionRequests.filter(obj => !toDelete.has(obj.id));

          this.messageService.add({
            severity: confirm ? 'success' : 'warn',
            detail: result.message,
          });
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao processar a solicitação, tente novamente!'
          });
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.getUsersSubscription) this.getUsersSubscription.unsubscribe();
    if (this.getReportsSubscription) this.getReportsSubscription.unsubscribe();
    if (this.getPermissionRequestsSubscription) this.getPermissionRequestsSubscription.unsubscribe();
    if (this.getChartsSubscription) this.getChartsSubscription.unsubscribe();
    if (this.deleteUserSubscription) this.deleteUserSubscription.unsubscribe();
    if (this.replyPermissionRequestSubscription) this.replyPermissionRequestSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
    if (this.getDonationChartSubscription) this.getDonationChartSubscription.unsubscribe();
    if (this.getContributionChartSubscription) this.getContributionChartSubscription.unsubscribe();
  }

  public handleChange(e): void {
    this.activeIndex = e.index;

    switch (this.activeIndex) {
      case TabViewIndex.Users:
        this.getUsers();
        return;

      case TabViewIndex.Reports:
        this.getReports();
        return;

      case TabViewIndex.PermissionRequests:
        this.getPermissionRequests();
        return;

      case TabViewIndex.Charts:
        this.getDonationChart();
        this.getContributionChart();
        return;
    }
  }

  public onClickExportExcel(data): void {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "reports");
    });
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public onClickExportPdf(data, fileName): void {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        // @ts-ignore
        const doc = new jsPDF.default();
        // @ts-ignore
        doc.autoTable(this.exportColumns, data);
        doc.save(`${fileName}.pdf`);
      });
    });
  }

  public onClickViewUser(id: string): void {
    this.dialogService.open(UserAccountComponent, {
      data: {
        id
      },
      showHeader: true,
      header: 'Dados do Usuário',
      width: this.isMobile() ? '90%' : '50%',
    });
  }

  public onClickDeleteUser(user: UserBaseResult): void {
    this.confirmationService.confirm({
      header: `${user.username}`,
      icon: `fas fa-trash`,
      message: `<strong class="text-danger">Atenção: Esta operação não pode ser desfeita.</strong> <br> <strong>Deseja realmente eliminar este cadastro?</strong>`,
      accept: () => {
        this.deleteUser(user.id);
      },
      reject: () => {
      }
    });
  }

  public onClickViewReport(id: string): void {
    this.dialogService.open(ReportComponent, {
      data: {
        id
      },
      showHeader: true,
      header: 'Dados do Relatório',
      width: this.isMobile() ? '90%' : '60%',
    });
  }

  public onClickConfirmPermissionRequest(request: PermissionRequestBaseResult): void {
    this.confirmationService.confirm({
      header: `${request.username}`,
      icon: `fas fa-trash`,
      message: `<strong class="text-danger">Atenção: Esta operação não pode ser desfeita.</strong> <br> <strong>Deseja realmente atribuir as permissões de Instituição à este cadastro?</strong>`,
      accept: () => {
        this.replyPermissionRequest(request.id, true);
      },
      reject: () => {
      }
    });
  }

  public onClickDeclinePermissionRequest(request: PermissionRequestBaseResult): void {
    this.confirmationService.confirm({
      header: `${request.username}`,
      icon: `fas fa-trash`,
      message: `<strong class="text-danger">Atenção: Esta operação não pode ser desfeita.</strong> <br> <strong>Deseja realmente recusar a solicitação deste cadastro?</strong>`,
      accept: () => {
        this.replyPermissionRequest(request.id, false);
      },
      reject: () => {
      }
    });
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

  public isMobile(): boolean {
    return this.getScreenWidth() < 1024;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }

  public getAccountProvider(provider: string): { color: string, icon: string, name: string } {
    switch (provider) {
      case Provider.Application:
        return {
          color: '', icon: 'pi pi-id-card', name: 'Aplicativo'
        };
      case Provider.Facebook:
        return {
          color: '#4267B2', icon: 'pi pi-facebook', name: 'Facebook'
        };
      case Provider.Google:
        return {
          color: '#DB4437', icon: 'pi pi-google', name: 'Google'
        };
    }
  }

  public getSelectItemLabel(value: string | boolean, array: SelectItem[]): string {
    return array.find(f => f.value === value).label;
  }

  public removeFilter(event: Event, control: AbstractControlTypeSafe<string> | AbstractControlTypeSafe<boolean>): void {
    control.setValue(null);
  }
}
