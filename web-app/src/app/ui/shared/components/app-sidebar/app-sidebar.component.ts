import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SidebarMenuItemModel} from '../../../../domain/shared/components/app-sidebar/models/sidebar-menu-item.model';
import {AuthService} from '../../../auth/services/auth.service';
import {Subscription} from 'rxjs';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  private logoutSubscription: Subscription | undefined;

  @Input() menuItems: SidebarMenuItemModel[] = [];
  @Output() onMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.logoutSubscription)
      this.logoutSubscription.unsubscribe();
  }

  public isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  };

  public clickMenuItem(): void {
    this.onMenuItemClick.emit();
  }

  public logout(): void {
    this.authService.logout().subscribe((data: LogoutResult) => {
      if (data) {
        if (data.success) {
          window.location.href = '/';
        }
      }
    });
  }
}
