import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NavbarMenuItemModel} from '../../../../domain/shared/components/app-navbar/models/navbar-menu-item.model';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss'],
  providers: [Location]
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean = false;
  @Input() class: string = '';
  @Input() title: string = '';
  @Input() containerFluid: boolean = true;
  @Input() showLoginButton: boolean = false;
  @Input() user: AuthenticatedUserModel | undefined;
  @Input() menuItems: NavbarMenuItemModel[] = [];
  @Output() onToggleButtonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLogout: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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
    this.onLogin.emit();
  }

  public logout(): void {
    this.onLogout.emit();
  }
}
