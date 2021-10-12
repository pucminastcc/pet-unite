import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppIndexLayoutComponent} from './layouts/app-index-layout/app-index-layout.component';
import {AppAdminLayoutComponent} from './layouts/app-admin-layout/app-admin-layout.component';
import {RouterModule} from '@angular/router';
import {AppLoadingComponent} from './components/app-loading/app-loading.component';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {AppFooterComponent} from './components/app-footer/app-footer.component';
import {AppSidebarComponent} from './components/app-sidebar/app-sidebar.component';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';


@NgModule({
  declarations: [
    AppIndexLayoutComponent,
    AppAdminLayoutComponent,
    AppLoadingComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    MenuModule
  ],
  exports: [
    AppIndexLayoutComponent,
    AppAdminLayoutComponent,
    AppLoadingComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppSidebarComponent
  ]
})
export class SharedModule {
}
