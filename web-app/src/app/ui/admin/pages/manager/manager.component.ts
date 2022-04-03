import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../auth/services/auth.service';
import {ManagerService} from '../../services/manager.service';
import {UserBaseResult} from '../../../../domain/manager/models/results/user-base.result';
import {ConfirmationService} from 'primeng/api';
import {DeleteUserResult} from '../../../../domain/manager/models/results/delete-user.result';
import {DialogService} from 'primeng/dynamicdialog';
import {UserAccountComponent} from './components/user-account/user-account.component';
import {ReportBaseResult} from '../../../../domain/manager/models/results/report-base.result';
import {ReportComponent} from './components/report/report.component';
import {finalize} from 'rxjs/operators';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, OnDestroy {
  public basicData: any;
  public basicData2: any;
  public basicOptions: any;

  private getUsersSubscription: Subscription | undefined;
  private getReportsSubscription: Subscription | undefined;
  private deleteUserSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  public users: UserBaseResult[] = [];
  public reports: ReportBaseResult[] = [];
  public isLoading: boolean = false;
  public activeIndex: number = 0;

  public exportColumns: { dataKey: string; title: string }[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly managerService: ManagerService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.getUsersSubscription = this.getUsers();
  }

  private getCharts(): void {
    this.basicData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Doações',
          data: [3, 0, 2, 1, 0, 0, 2],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Adoções',
          data: [4, 2, 0, 3, 1, 1, 0],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };

    this.basicData2 = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Contribuições',
          data: [7, 2, 2, 4, 1, 1, 2],
          fill: true,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    };
  }

  ngOnDestroy(): void {
    if (this.getUsersSubscription) this.getUsersSubscription.unsubscribe();
    if (this.getReportsSubscription) this.getReportsSubscription.unsubscribe();
    if (this.deleteUserSubscription) this.deleteUserSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  private getUsers(): Subscription {
    this.isLoading = true;
    return this.managerService.getUsers()
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe((data: UserBaseResult[]) => {
        if (data) {
          this.users = data;
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  private getReports(): Subscription {
    this.isLoading = true;
    return this.managerService.getReports()
      .pipe(finalize(() => {
        this.isLoading = false
      })).subscribe((data: ReportBaseResult[]) => {
        if (data) {
          this.reports = data;
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
        if (error.status === 401) {
          this.logout();
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

  public viewUser(id: string): void {
    this.dialogService.open(UserAccountComponent, {
      data: {
        id
      },
      showHeader: true,
      header: 'Dados do Usuário',
      width: this.isMobile() ? '90%' : '50%',
    });
  }

  public viewReport(id: string): void {
    this.dialogService.open(ReportComponent, {
      data: {
        id
      },
      showHeader: true,
      header: 'Dados do Relatório',
      width: this.isMobile() ? '90%' : '60%',
    });
  }

  public confirmDelete(user: UserBaseResult): void {
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

  private deleteUser(id: string): void {
    this.deleteUserSubscription = this.managerService.deleteUser({
      id
    }).subscribe((data: DeleteUserResult) => {
      if (data) {
        if (data.success) {
          const toDelete = new Set([id]);
          this.users = this.users.filter(obj => !toDelete.has(obj.id));
        }
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
    });
  }

  public exportExcel(data): void {
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

  public exportPdf(data, fileName): void {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        // @ts-ignore
        const doc = new jsPDF.default();
        // @ts-ignore
        doc.autoTable(this.exportColumns, data);
        doc.save(`${fileName}.pdf`);
      })
    })
  }

  public handleChange(e): void {
    const index = e.index;
    this.activeIndex = index;

    switch (index) {
      case 0:
        this.getUsersSubscription = this.getUsers();
        return;
      case 1:
        this.getReportsSubscription = this.getReports();
        return;
      case 2:
        this.getCharts();
        return;
      default:
        return;
    }
  }

  public getProvider(provider: string) {
    switch (provider) {
      case 'application':
        return {
          color: '', icon: 'pi pi-id-card', name: 'Aplicativo'
        };
      case 'facebook':
        return {
          color: '#4267B2', icon: 'pi pi-facebook', name: 'Facebook'
        };
      case 'google':
        return {
          color: '#DB4437', icon: 'pi pi-google', name: 'Google'
        };
      default:
        return {
          color: '', icon: '', name: '', label: ''
        };
    }
  }

  public isMobile(): boolean {
    return this.getScreenWidth() < 1024;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }
}
