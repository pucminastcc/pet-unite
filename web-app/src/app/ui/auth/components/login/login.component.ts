import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {ILoginForm} from '../../../../domain/auth/models/forms/ilogin.form';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {FormControl, Validators} from '@angular/forms';
import {AccountActionEnum} from '../../../../domain/auth/enums/account-action.enum';
import {AccountActionModel} from '../../../../domain/auth/models/account-action.model';
import {Subscription} from 'rxjs';
import {LoginResult} from '../../../../domain/auth/models/results/login.result';
import {AuthService} from '../../services/auth.service';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') emailInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLElement> | undefined;

  @Output() onSelectAccountAction: EventEmitter<AccountActionModel> = new EventEmitter<AccountActionModel>();
  public accountActionEnum = AccountActionEnum;

  public isLoading: boolean = false;
  public submitted: boolean = false;
  public loginForm: FormGroupTypeSafe<ILoginForm>;

  private loginSubscription: Subscription | undefined;
  private facebookLoginSubscription: Subscription | undefined;
  private googleLoginSubscription: Subscription | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private readonly fb: FormBuilderTypeSafe,
    private readonly authenticationService: AuthService,
    private readonly messageService: MessageService,
    private readonly socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.fb.group<ILoginForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.loginSubscription)
      this.loginSubscription.unsubscribe();

    if (this.facebookLoginSubscription)
      this.facebookLoginSubscription.unsubscribe();

    if (this.googleLoginSubscription)
      this.googleLoginSubscription.unsubscribe();
  }

  private notify(severity: string = 'success', summary: string = '', detail: string = '', closable: boolean = false, life: number = 6500): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      closable,
      life
    });
  }

  private focus(el: ElementRef<HTMLElement> | undefined): void {
    el?.nativeElement.focus();
  }

  private reset(): void {
    this.submitted = false;
    this.isLoading = false;
    this.lf.password.reset();
    this.config.closable = true;
  }

  public selectAccountAction(action: AccountActionEnum, dialogHeader: string): void {
    this.onSelectAccountAction.emit({action, dialogHeader});
  }

  public login(): void {
    this.messageService.clear();
    this.submitted = true;

    if (this.loginForm.invalid) {
      if (this.lf.email.invalid) return this.focus(this.emailInput);
      if (this.lf.password.invalid) return this.focus(this.passwordInput);
      return;
    }

    this.isLoading = true;
    this.config.closable = false;
    const {email, password} = this.loginForm.value;
    this.loginSubscription = this.authenticationService.login({
      email,
      password
    }).subscribe((data: LoginResult) => {
      if (data) {
        if (data.accessToken && data.user) {
          this.notify('success', 'Sucesso', data.message);
          setTimeout(() => window.location.reload(), 3000);
        } else {
          this.notify('error', 'Erro', data.message);
          this.reset();
        }
      }
    }, (err) => {
      this.notify('error', 'Erro', 'Ops, algo deu errado :(');
      this.reset();
    });
  }

  public onClickFacebookButton(): void {
    this.messageService.clear();
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        if (user) {
          this.facebookLoginSubscription = this.loginFacebook(user);
        }
      }, (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Autorização',
          detail: 'Não foi possível realizar o login com o Facebook'
        });
      });
  }

  private loginFacebook(user: SocialUser): Subscription {
    return this.authenticationService.loginFacebok(user)
      .subscribe((data: LoginResult) => {
        if (data) {
          if (data.accessToken && data.user) {
            this.notify('success', 'Sucesso', data.message);
            setTimeout(() => window.location.reload(), 1500);
          } else {
            this.notify('error', 'Erro', data.message);
            this.reset();
          }
        }
      }, (err) => {
      });
  }

  public onClickGoogleButton(): void {
    this.messageService.clear();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        if (user) {
          this.googleLoginSubscription = this.loginGoogle(user);
        }
      }, (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Autorização',
          detail: 'Não foi possível realizar o login com o Google'
        });
      });
  }

  private loginGoogle(user: SocialUser): Subscription {
    return this.authenticationService.loginGoogle(user)
      .subscribe((data: LoginResult) => {
        if (data) {
          if (data.accessToken && data.user) {
            this.notify('success', 'Sucesso', data.message);
            setTimeout(() => window.location.reload(), 1500);
          } else {
            this.notify('error', 'Erro', data.message);
            this.reset();
          }
        }
      }, (err) => {
      });
  }
}
