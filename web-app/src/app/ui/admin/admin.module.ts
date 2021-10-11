import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PetComponent } from './pages/pet/pet.component';
import { DonationComponent } from './pages/donation/donation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PetComponent,
    DonationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
