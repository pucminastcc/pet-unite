import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AccountActionModel} from '../../../../domain/auth/models/account-action.model';
import {AccountActionEnum} from '../../../../domain/auth/enums/account-action.enum';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ISendPasswordResetCodeForm} from '../../../../domain/auth/models/forms/isend-password-reset-code.form';
import {Subscription} from 'rxjs';
import {SendPasswordResetCodeResult} from '../../../../domain/auth/models/results/send-password-reset-code.result';
import {PasswordResetActionEnum} from '../../../../domain/auth/enums/password-reset-action.enum';
import {IValidatePasswordResetCodeForm} from '../../../../domain/auth/models/forms/ivalidate-password-reset-code.form';
import {ValidatePasswordResetCodeResult} from '../../../../domain/auth/models/results/validate-password-reset-code.result';
import {IChangePasswordForm} from '../../../../domain/auth/models/forms/ichange-password.form';
import {ChangePasswordResult} from '../../../../domain/auth/models/results/change-password.result';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') emailInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('codeInput') codeInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef<HTMLElement> | undefined;

  @Output() onSelectAccountAction: EventEmitter<AccountActionModel> = new EventEmitter<AccountActionModel>();
  public accountActionEnum = AccountActionEnum;

  public passwordResetActionEnum = PasswordResetActionEnum;
  public passwordResetAction: PasswordResetActionEnum;

  public sendPasswordResetCodeForm: FormGroupTypeSafe<ISendPasswordResetCodeForm>;
  public validatePasswordResetCodeForm: FormGroupTypeSafe<IValidatePasswordResetCodeForm>;
  public changePasswordForm: FormGroupTypeSafe<IChangePasswordForm>;

  public submitted = false;
  public isLoading = false;

  private sendPasswordResetCodeSubscription: Subscription | undefined;
  private validatePasswordResetCodeSubscription: Subscription | undefined;
  private changePasswordSubscription: Subscription | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService,
    private readonly authService: AuthService
  ) {
    this.passwordResetAction = PasswordResetActionEnum.SendVerificationCode;

    this.sendPasswordResetCodeForm = this.fb.group<ISendPasswordResetCodeForm>({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    });
    this.validatePasswordResetCodeForm = this.fb.group<IValidatePasswordResetCodeForm>({
      code: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    });
    this.changePasswordForm = this.fb.group<IChangePasswordForm>({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required]),
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

  get sprcf() {
    return this.sendPasswordResetCodeForm.controls;
  }

  get vprcf() {
    return this.validatePasswordResetCodeForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sendPasswordResetCodeSubscription)
      this.sendPasswordResetCodeSubscription.unsubscribe();

    if (this.validatePasswordResetCodeSubscription)
      this.validatePasswordResetCodeSubscription.unsubscribe();

    if (this.changePasswordSubscription)
      this.changePasswordSubscription.unsubscribe();
  }

  private focus(el: ElementRef<HTMLElement> | undefined): void {
    el?.nativeElement.focus();
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

  private reset(): void {
    this.submitted = false;
    this.isLoading = false;
    this.config.closable = true;
  }

  public selectAccountAction(action: AccountActionEnum, dialogHeader: string): void {
    this.onSelectAccountAction.emit({action, dialogHeader});
  }

  public sendPasswordResetCode(): void {
    this.messageService.clear();
    this.submitted = true;

    if (this.sendPasswordResetCodeForm.invalid) {
      if (this.sprcf.email.invalid) return this.focus(this.emailInput);
      return;
    }

    this.isLoading = true;
    this.config.closable = false;

    const {email} = this.sendPasswordResetCodeForm.value;
    this.sendPasswordResetCodeSubscription = this.authService.sendPasswordResetCode({
      email
    }).subscribe((data: SendPasswordResetCodeResult) => {
      if (data) {
        if (data.success) {
          this.notify('success', 'Sucesso', data.message, true);
          this.vprcf.email.setValue(email);
          this.passwordResetAction = PasswordResetActionEnum.CodeValidation;
          this.sendPasswordResetCodeForm.reset();
        } else {
          this.notify('error', 'Erro', data.message);
        }
        this.reset();
      }
    }, () => {
      this.notify('error', 'Erro', 'Ops, algo deu errado');
      this.isLoading = false;
    });
  }

  public validatePasswordResetCode(): void {
    this.messageService.clear();
    this.submitted = true;

    if (this.validatePasswordResetCodeForm.invalid) {
      if (this.vprcf.code.invalid) return this.focus(this.codeInput);
      return;
    }

    this.isLoading = true;
    this.config.closable = false;

    const {code, email} = this.validatePasswordResetCodeForm.value;
    this.validatePasswordResetCodeSubscription = this.authService.validatePasswordResetCode({
      code,
      email
    }).subscribe((data: ValidatePasswordResetCodeResult) => {
      if (data) {
        if (data.success) {
          this.notify('success', 'Sucesso', data.message, true);
          this.passwordResetAction = PasswordResetActionEnum.ChangePassword;
          this.validatePasswordResetCodeForm.reset();
        } else {
          this.notify('error', 'Erro', data.message);
          this.vprcf.code.setValue('');
        }
        this.reset();
      }
    }, () => {
      this.notify('error', 'Erro', 'Ops, algo deu errado');
      this.isLoading = false;
    });
  }

  public changePassword(): void {
    this.messageService.clear();
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      if (this.cpf.password.invalid) return this.focus(this.passwordInput);
      if (this.cpf.confirmPassword.invalid) return this.focus(this.confirmPasswordInput);
      return;
    }

    this.isLoading = true;
    this.config.closable = false;
    const {password} = this.changePasswordForm.value;
    this.changePasswordSubscription = this.authService.changePassword({
      password
    }).subscribe((data: ChangePasswordResult) => {
      if (data) {
        if (data.success) {
          this.notify('success', 'Sucesso', data.message, true);
          this.changePasswordForm.reset();
          this.selectAccountAction(AccountActionEnum.Login, 'Login');
        } else {
          this.notify('error', 'Erro', data.message);
        }
        this.reset();
      }
    }, () => {
      this.notify('error', 'Erro', 'Ops, algo deu errado');
      this.isLoading = false;
    });
  }
}
