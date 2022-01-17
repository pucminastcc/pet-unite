import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {PetComponent} from './pages/pet/pet.component';
import {DonationComponent} from './pages/donation/donation.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {AuthService} from '../auth/services/auth.service';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PetComponent,
    DonationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputMaskModule,
    ToastModule,
    TabViewModule
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule {
}
