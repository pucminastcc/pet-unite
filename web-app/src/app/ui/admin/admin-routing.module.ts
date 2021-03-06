import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {PetComponent} from './pages/pet/pet.component';
import {DonationComponent} from './pages/donation/donation.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ManagerComponent} from './pages/manager/manager.component';
import {SupportComponent} from './pages/support/support.component';
import {InstitutionComponent} from './pages/institution/institution.component';
import {ContributionComponent} from './pages/contribution/contribution.component';

const routes: Routes = [
  {path: 'manager', canActivate: [AuthGuard], component: ManagerComponent},
  {path: 'institution', canActivate: [AuthGuard], component: InstitutionComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  {path: 'donation', canActivate: [AuthGuard], component: DonationComponent},
  {path: 'pet', canActivate: [AuthGuard], component: PetComponent},
  {path: 'contribution', canActivate: [AuthGuard], component: ContributionComponent},
  {path: 'support', canActivate: [AuthGuard], component: SupportComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
