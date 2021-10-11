import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SidebarMenuItemModel} from '../../../../domain/shared/components/app-sidebar/models/sidebar-menu-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
  @Input() menuItems: SidebarMenuItemModel[] = [];
  @Output() onMenuItemClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  };

  public clickMenuItem(): void {
    this.onMenuItemClick.emit(true);
  }
}
