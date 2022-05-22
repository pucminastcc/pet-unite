import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppLoadingComponent} from './components/app-loading/app-loading.component';
import {AppNavbarComponent} from './components/app-navbar/app-navbar.component';
import {AppFooterComponent} from './components/app-footer/app-footer.component';
import {AppSidebarComponent} from './components/app-sidebar/app-sidebar.component';
import {ButtonModule} from 'primeng/button';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {AppIndexLayoutComponent} from './layouts/app-index-layout/app-index-layout.component';
import {AppAdminLayoutComponent} from './layouts/app-admin-layout/app-admin-layout.component';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {AppTermsComponent} from './components/app-terms/app-terms.component';


@NgModule({
  declarations: [
    AppIndexLayoutComponent,
    AppAdminLayoutComponent,
    AppLoadingComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppSidebarComponent,
    AppTermsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DynamicDialogModule,
    ToastModule,
    TooltipModule,
    DialogModule,
  ],
  exports: [
    AppLoadingComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppSidebarComponent,
    AppTermsComponent
  ],
  providers: [
    DialogService,
    MessageService,
  ]
})
export class SharedModule {
}
