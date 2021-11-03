import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NavbarMenuItemModel} from '../../../../domain/shared/components/app-navbar/models/navbar-menu-item.model';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {AccountActionComponent} from '../../../auth/components/account-action/account-action.component';
import {AuthenticatedUserResult} from '../../../../domain/auth/models/results/authenticated-user.result';
import {AuthService} from '../../../auth/services/auth.service';
import {Subscription} from 'rxjs';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-index-layout',
  templateUrl: './app-index-layout.component.html',
  styleUrls: ['./app-index-layout.component.scss']
})
export class AppIndexLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly getAuthenticatedUserSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  public user: AuthenticatedUserModel | undefined;
  public isLoading = false;
  public menuItems: NavbarMenuItemModel[] = [];
  private toggleButton: HTMLElement = document.createElement('div');
  private navMenu: HTMLElement = document.createElement('div');
  private ref: DynamicDialogRef | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    // @ts-ignore
    this.router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        window.location.reload();
      }
    });

    this.getAuthenticatedUserSubscription = this.authService.getAuthenticatedUser()
      .subscribe((data: AuthenticatedUserResult) => {
        if (data) {
          this.user = data;
        }
      });
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    // setTimeout(() => this.isLoading = false, 3000);
  }

  ngAfterViewInit(): void {
    this.toggleButton = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    this.navMenu = document.getElementsByClassName('navbar-nav')[0] as HTMLElement;
  }

  ngOnDestroy(): void {
    if (this.ref)
      this.ref.destroy();

    this.unsubscribe();
  }

  private unsubscribe(): void {
    if (this.getAuthenticatedUserSubscription)
      this.getAuthenticatedUserSubscription.unsubscribe();

    if (this.logoutSubscription)
      this.logoutSubscription.unsubscribe();
  }

  private getMenuItems(): NavbarMenuItemModel[] {
    return [
      {path: '/home', title: 'Home', icon: 'fas fa-home', class: ''},
      {path: '/about', title: 'Sobre', icon: 'fas fa-book', class: ''},
    ];
  }

  public toggle(): void {
    if (this.toggleButton.classList.contains('toggled'))
      this.toggleButton.classList.remove('toggled');
    else
      this.toggleButton.classList.add('toggled');

    this.navMenu.classList.toggle('active');
  }

  public openLoginModal(): void {
    this.ref = this.dialogService.open(AccountActionComponent, {
      width: this.getScreenWidth() < 1024 ? '90%' : '40%'
    });

    this.ref.onClose.subscribe(() => {
      this.messageService.clear();
    });
  }

  public logout(): void {
    this.logoutSubscription = this.authService.logout().subscribe((data: LogoutResult) => {
      if (data) {
        if (data.success) {
          window.location.reload();
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }
}
