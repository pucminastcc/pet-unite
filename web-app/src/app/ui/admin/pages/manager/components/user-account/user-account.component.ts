import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UserAccountResult} from '../../../../../../domain/manager/models/results/user-account.result';
import {ManagerService} from '../../../../services/manager.service';
import {Subscription} from 'rxjs';
import {LogoutResult} from '../../../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  private getUserAccountSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  private readonly id: string;
  public isLoading: boolean = true;
  public user: UserAccountResult | undefined;
  public provider: { color: string; icon: string; name: string; label: string };

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private readonly managerService: ManagerService,
    private readonly authService: AuthService,
  ) {
    this.id = this.config.data.id;
  }

  ngOnInit(): void {
    this.getUserAccountSubscription = this.managerService.getUserAccount({
      id: this.id
    }).subscribe((data: UserAccountResult) => {
      if (data) {
        this.user = data;
        this.provider = this.getProvider(this.user.provider);
        this.isLoading = false;
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getUserAccountSubscription) this.getUserAccountSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
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

  public getProvider(provider: string) {
    switch (provider) {
      case 'application':
        return {
          color: '', icon: 'pi pi-id-card', name: 'Aplicativo', label: 'Conta do Aplicativo'
        };
      case 'facebook':
        return {
          color: '#4267B2', icon: 'pi pi-facebook', name: 'Facebook', label: 'Conta do Facebook'
        };
      case 'google':
        return {
          color: '#DB4437', icon: 'pi pi-google', name: 'Google', label: 'Conta da Google'
        };
      default:
        return {
          color: '', icon: '', name: '', label: ''
        };
    }
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
