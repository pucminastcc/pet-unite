import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppIndexLayoutComponent} from './ui/shared/layouts/app-index-layout/app-index-layout.component';
import {AppAdminLayoutComponent} from './ui/shared/layouts/app-admin-layout/app-admin-layout.component';
import {AuthGuard} from './ui/shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '', component: AppIndexLayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./ui/index/index.module').then(m => m.IndexModule)}
    ]
  },
  {
    path: 'admin', component: AppAdminLayoutComponent, canActivate: [AuthGuard],
    children: [
      {path: '', loadChildren: () => import('./ui/admin/admin.module').then(m => m.AdminModule)}
    ]
  },
  {path: '**', redirectTo: '/home'}
];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
});
