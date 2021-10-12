import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppNavbarComponent} from '../../components/app-navbar/app-navbar.component';
import {NavbarMenuItemModel} from '../../../../domain/shared/components/app-navbar/models/navbar-menu-item.model';

@Component({
  selector: 'app-index-layout',
  templateUrl: './app-index-layout.component.html',
  styleUrls: ['./app-index-layout.component.scss']
})
export class AppIndexLayoutComponent implements OnInit, AfterViewInit {
  public isLoading = false;
  public menuItems: NavbarMenuItemModel[] = [];
  public user: any = undefined;
  private toggleButton: HTMLElement = document.createElement('div');
  private navMenu: HTMLElement = document.createElement('div');

  constructor() {
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
    if (this.toggleButton.classList.contains('toggled')) {
      this.toggleButton.classList.remove('toggled');
    } else {
      this.toggleButton.classList.add('toggled');
    }
    this.navMenu.classList.toggle('active');
  }

  public openLoginModal(): void {

  }

  ngAfterViewInit(): void {
    this.toggleButton = document.getElementsByClassName('navbar-toggler')[0] as HTMLElement;
    this.navMenu = document.getElementsByClassName('navbar-nav')[0] as HTMLElement;
  }
}
