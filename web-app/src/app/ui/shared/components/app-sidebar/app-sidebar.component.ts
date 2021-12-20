import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SidebarMenuItemModel} from '../../../../domain/shared/components/app-sidebar/models/sidebar-menu-item.model';
import {AuthService} from '../../../auth/services/auth.service';
import {Subscription} from 'rxjs';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean = false;
  @Input() user: AuthenticatedUserModel | undefined;
  @Input() menuItems: SidebarMenuItemModel[] = [];
  @Output() onMenuItemClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLogout: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public clickMenuItem(): void {
    this.onMenuItemClick.emit();
  }

  public logout(): void {
    this.onLogout.emit();
  }
}
