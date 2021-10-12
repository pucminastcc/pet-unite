import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NavbarMenuItemModel} from '../../../../domain/shared/components/app-navbar/models/navbar-menu-item.model';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
  providers: [Location]
})
export class AppNavbarComponent implements OnInit {
  items: MenuItem[] = [];
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() containerFluid: boolean = true;
  @Input() showLoginButton: boolean = false;
  @Input() user: any = undefined;
  @Input() menuItems: NavbarMenuItemModel[] = [];
  @Output() onToggleButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLoginButtonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'New', icon: 'pi pi-fw pi-plus'},
      {label: 'Download', icon: 'pi pi-fw pi-download'}
    ];
  }

  public navigate(path: string): void {
    this.toggle();
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([path]).then(() => {
    });
  }

  public toggle(): void {
    this.onToggleButtonClick.emit();
  }

  public login(): void {
    this.onLoginButtonClick.emit();
  }
}
