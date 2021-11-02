import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AccountActionComponent} from './components/account-action/account-action.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormBuilderTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';


@NgModule({
  declarations: [
    AccountActionComponent,
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    HttpClientModule,
    CheckboxModule,
    AuthRoutingModule
  ],
  providers: [
    FormBuilderTypeSafe,
    MessageService
  ]
})
export class AuthModule {
}
