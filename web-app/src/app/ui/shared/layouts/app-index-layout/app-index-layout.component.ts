import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NavbarMenuItemModel} from '../../../../domain/shared/components/app-navbar/models/navbar-menu-item.model';
import {UserModel} from '../../../../domain/auth/models/user.model';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {AccountActionComponent} from '../../../auth/components/account-action/account-action.component';

@Component({
  selector: 'app-index-layout',
  templateUrl: './app-index-layout.component.html',
  styleUrls: ['./app-index-layout.component.scss']
})
export class AppIndexLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly user: UserModel | undefined;
  public isLoading = false;
  public menuItems: NavbarMenuItemModel[] = [];
  private toggleButton: HTMLElement = document.createElement('div');
  private navMenu: HTMLElement = document.createElement('div');
  private ref: DynamicDialogRef | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
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

  ngAfterViewInit(): void {
    this.toggleButton = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    this.navMenu = document.getElementsByClassName('navbar-nav')[0] as HTMLElement;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }

  ngOnDestroy(): void {
    if(this.ref)
      this.ref.destroy();
  }
}
