import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppIndexLayoutComponent} from './layouts/app-index-layout/app-index-layout.component';
import {AppAdminLayoutComponent} from './layouts/app-admin-layout/app-admin-layout.component';
import {RouterModule} from '@angular/router';
import { AppLoadingComponent } from './components/app-loading/app-loading.component';


@NgModule({
  declarations: [
    AppIndexLayoutComponent,
    AppAdminLayoutComponent,
    AppLoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
