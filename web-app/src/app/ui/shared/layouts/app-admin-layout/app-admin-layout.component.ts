import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SidebarMenuItemModel} from '../../../../domain/shared/components/app-sidebar/models/sidebar-menu-item.model';
import {Router} from '@angular/router';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {AuthService} from '../../../auth/services/auth.service';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './app-admin-layout.component.html',
  styleUrls: ['./app-admin-layout.component.scss']
})
export class AppAdminLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public user: AuthenticatedUserModel | undefined;

  public isLoading: boolean = false;
  public mobileMenuVisible: number = 0;
  public sidebarMenuItem: SidebarMenuItemModel[] = [];

  private location: Location;
  private toggleButton: HTMLElement = document.createElement('div');
  private layer: HTMLElement = document.createElement('div');
  private body: HTMLElement = document.createElement('div');
  private sidebarVisible: boolean = false;

  constructor(
    private readonly element: ElementRef,
    private readonly router: Router,
    private readonly authService: AuthService,
    location: Location,
  ) {
    this.location = location;
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe((data: AuthenticatedUserModel) => {
      if (data) {
        this.user = data;
        this.sidebarMenuItem = this.getSidebarMenuItems();
      }
    });
  }

  ngAfterViewInit(): void {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    this.body = document.getElementsByTagName('body')[0] as HTMLElement;
    this.layer = document.getElementsByClassName('close-layer')[0] as HTMLElement;

    this.sidebarClose();

    if (this.layer) {
      this.layer.remove();
      this.mobileMenuVisible = 0;
    }

    setTimeout(() => this.isLoading = false, 3000);
  }

  ngOnDestroy(): void {
    this.body.classList.remove('nav-open');
  }

  private getSidebarMenuItems(): SidebarMenuItemModel[] {
    const routePrefix = '/admin';
    const routes = [];
    if (this.user?.isSuperUser) {
      routes.push({path: `${routePrefix}/manager`, title: 'Gestão', icon: 'fas fa-lock', class: ''});
    }
    if (this.user?.isInstitution) {
      routes.push({path: `${routePrefix}/institution`, title: 'Instituição', icon: 'fas fa-lock', class: ''});
      routes.push({path: `${routePrefix}/dashboard`, title: 'Dashboard', icon: 'fas fa-chart-line', class: ''});
    }
    routes.push({path: `${routePrefix}/profile`, title: 'Perfil', icon: 'fas fa-user', class: ''});
    routes.push({path: `${routePrefix}/donation`, title: 'Doações', icon: 'fas fa-hand-holding-heart', class: ''});
    routes.push({path: `${routePrefix}/pet`, title: 'Pets', icon: 'fas fa-dog', class: ''});
    routes.push({path: `${routePrefix}/contribution`, title: 'Contribuições', icon: 'fas fa-paw', class: ''});
    routes.push({path: `${routePrefix}/support`, title: 'Suporte', icon: 'fas fa-question-circle', class: ''});

    return routes;
  }

  public sidebarOpen(): void {
    const toggleButton = this.toggleButton;
    setTimeout(() => toggleButton.classList.add('toggled'), 500);
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
          this.sidebarVisible = false;
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

  public logout(): void {
    this.authService.logout().subscribe((data: LogoutResult) => {
      if (data) {
        if (data.success) {
          window.location.href = '/';
        }
      }
    });
  }

  public isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileMenu();
  }
}
