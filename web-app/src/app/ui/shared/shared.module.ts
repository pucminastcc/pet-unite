import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppIndexLayoutComponent} from './layouts/app-index-layout/app-index-layout.component';
import {AppAdminLayoutComponent} from './layouts/app-admin-layout/app-admin-layout.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppIndexLayoutComponent,
    AppAdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
