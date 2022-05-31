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
import {DataViewModule} from 'primeng/dataview';
import {ManagerComponent} from './pages/manager/manager.component';
import {DialogModule} from 'primeng/dialog';
import {EditorModule} from 'primeng/editor';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PetRegistrationComponent} from './pages/pet/components/pet-registration/pet-registration.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ChipModule} from 'primeng/chip';
import {TableModule} from 'primeng/table';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {UserAccountComponent} from './pages/manager/components/user-account/user-account.component';
import {SupportComponent} from './pages/support/support.component';
import {ChartModule} from 'primeng/chart';
import {ReportComponent} from './pages/manager/components/report/report.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {BadgeModule} from 'primeng/badge';
import {InstitutionComponent} from './pages/institution/institution.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {DonationDetailComponent} from './pages/donation/components/donation-detail/donation-detail.component';
import {ContributionComponent} from './pages/contribution/contribution.component';
import {TagModule} from 'primeng/tag';
import {CheckboxModule} from 'primeng/checkbox';
import { DonationStatusComponent } from './pages/donation/components/donation-status/donation-status.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PetComponent,
    DonationComponent,
    ManagerComponent,
    PetRegistrationComponent,
    UserAccountComponent,
    SupportComponent,
    ReportComponent,
    InstitutionComponent,
    DonationDetailComponent,
    ContributionComponent,
    DonationStatusComponent,
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
    TabViewModule,
    DataViewModule,
    DialogModule,
    EditorModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    MessageModule,
    MessagesModule,
    ImageModule,
    CardModule,
    ScrollPanelModule,
    ChipModule,
    TableModule,
    ProgressSpinnerModule,
    TooltipModule,
    ChartModule,
    InputTextareaModule,
    BadgeModule,
    RatingModule,
    InputNumberModule,
    TagModule,
    CheckboxModule
  ],
  providers: [
    AuthService,
    ConfirmationService
  ]
})
export class AdminModule {
}
