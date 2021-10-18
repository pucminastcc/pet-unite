import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AccountActionEnum} from '../../../../domain/auth/enums/account-action.enum';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IRegisterForm} from '../../../../domain/auth/models/forms/iregister.form';
import {AccountActionModel} from '../../../../domain/auth/models/account-action.model';
import {Subscription} from 'rxjs';
import {RegisterResult} from '../../../../domain/auth/models/results/register.result';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') emailInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('usernameInput') usernameInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef<HTMLElement> | undefined;

  @Output() onSelectAccountAction: EventEmitter<AccountActionModel> = new EventEmitter<AccountActionModel>();
  public accountActionEnum = AccountActionEnum;

  public registerForm: FormGroupTypeSafe<IRegisterForm>;
  public submitted = false;
  public isLoading = false;

  private registerSubscription: Subscription | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group<IRegisterForm>({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue])
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  public mustMatch(controlName: string, matchingControlName: string): ValidationErrors {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get rf() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.registerSubscription)
      this.registerSubscription.unsubscribe();
  }

  private focus(el: ElementRef<HTMLElement> | undefined): void {
    el?.nativeElement.focus();
  }

  private reset(): void {
    this.submitted = false;
    this.isLoading = false;
    this.registerForm.reset();
    this.config.closable = true;
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

  public selectAccountAction(action: AccountActionEnum, dialogHeader: string): void {
    this.onSelectAccountAction.emit({action, dialogHeader});
  }

  public register(): void {
    this.messageService.clear();
    this.submitted = true;

    if (this.registerForm.invalid) {
      if (this.rf.email.invalid) return this.focus(this.emailInput);
      if (this.rf.password.invalid) return this.focus(this.passwordInput);
      if (this.rf.confirmPassword.invalid) return this.focus(this.confirmPasswordInput);
      return;
    }

    this.isLoading = true;
    this.config.closable = false;
    const {email, username, password} = this.registerForm.value;
    this.registerSubscription = this.authService.register({
      email,
      username,
      password
    }).subscribe((data: RegisterResult) => {
      if (data) {
        if (data.success) {
          this.notify('success', 'Sucesso', data.message, true);
          this.selectAccountAction(AccountActionEnum.Login, 'Login');
        } else {
          this.notify('error', 'Erro', data.message);

          if (data.message.toLowerCase().includes('email')) {
            this.rf.email.setValue('');
          } else if (data.message.toLowerCase().includes('usuário')) {
            this.rf.username.setValue('');
          }
        }
        this.isLoading = false;
      }
    }, () => {
      this.notify('error', 'Erro', 'Ops, algo deu errado');
      this.isLoading = false;
    });
  }
}
