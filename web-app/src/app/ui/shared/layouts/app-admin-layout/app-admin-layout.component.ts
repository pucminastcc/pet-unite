import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SidebarMenuItemModel} from '../../../../domain/shared/components/app-sidebar/models/sidebar-menu-item.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './app-admin-layout.component.html',
  styleUrls: ['./app-admin-layout.component.scss']
})
export class AppAdminLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public isLoading = false;
  public mobileMenuVisible: number = 0;
  public sidebarMenuItem: SidebarMenuItemModel[] = [];

  private location: Location;
  private toggleButton: any;
  private layer: any;
  private body: any;
  private sidebarVisible: boolean = false;

  constructor(
    private readonly element: ElementRef,
    private readonly router: Router,
    location: Location,
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.sidebarMenuItem = this.getSidebarMenuItems();
  }

  ngAfterViewInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.body = document.getElementsByTagName('body')[0];
    this.layer = document.getElementsByClassName('close-layer')[0];

    this.sidebarClose();
    if (this.layer) {
      this.layer.remove();
      this.mobileMenuVisible = 0;
    }
  }

  ngOnDestroy(): void {
  }

  private getSidebarMenuItems(): SidebarMenuItemModel[] {
    const routePrefix = '/admin';
    return [
      {path: `${routePrefix}/dashboard`, title: 'Dashboard', icon: 'fas fa-chart-line', class: ''},
      {path: `${routePrefix}/profile`, title: 'Perfil', icon: 'fas fa-user', class: ''},
      {path: `${routePrefix}/pet`, title: 'Pets', icon: 'fas fa-paw', class: ''},
      {path: `${routePrefix}/donation`, title: 'Doações', icon: 'fas fa-dog', class: ''},
    ];
  }

  public sidebarOpen(): void {
    setTimeout(() => this.toggleButton.classList.add('toggled'), 500);
    this.body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  public sidebarClose(): void {
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    this.body.classList.remove('nav-open');
  }

  public sidebarToggle(): void {
    if (!this.sidebarVisible)
      this.sidebarOpen();
    else
      this.sidebarClose();

    if (this.mobileMenuVisible == 1) {
      this.body.classList.remove('nav-open');

      if (this.layer)
        this.layer.remove();

      setTimeout(() => this.toggleButton.classList.remove('toggled'), 400);

      this.mobileMenuVisible = 0;
    } else {
      setTimeout(() => this.toggleButton.classList.add('toggled'), 430);

      this.layer = document.createElement('div');
      this.layer.setAttribute('class', 'close-layer');

      if (this.body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild(this.layer);
      } else if (this.body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild(this.layer);
      }

      setTimeout(() => this.layer.classList.add('visible'), 100);

      this.layer.onclick = () => {
        this.body.classList.remove('nav-open');
        this.mobileMenuVisible = 0;
        this.layer.classList.remove('visible');
        setTimeout(() => {
          this.layer.remove();
          this.toggleButton.classList.remove('toggled');
        }, 400);
      };

      this.body.classList.add('nav-open');
      this.mobileMenuVisible = 1;
    }
  }

  public getTitle(): string {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#')
      title = title.slice(1);

    for (let item = 0; item < this.sidebarMenuItem.length; item++) {
      if (this.sidebarMenuItem[item].path === title) {
        return this.sidebarMenuItem[item].title;
      }
    }
    return 'Dashboard';
  }

  public onEventEmit(event: boolean): void {
    if (event)
      this.sidebarToggle();
  }
}
