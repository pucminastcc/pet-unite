import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AccountActionModel} from '../../../../domain/auth/models/account-action.model';
import {AccountActionEnum} from '../../../../domain/auth/enums/account-action.enum';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {IPasswordRecoveryForm} from '../../../../domain/auth/models/forms/ipassword-recovery.form';
import {Subscription} from 'rxjs';
import {SendPasswordRecoveryResult} from '../../../../domain/auth/models/results/send-password-recovery.result';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit, OnDestroy {
  @ViewChild('emailInput') emailInput: ElementRef<HTMLElement> | undefined;

  @Output() onSelectAccountAction: EventEmitter<AccountActionModel> = new EventEmitter<AccountActionModel>();
  public accountActionEnum = AccountActionEnum;

  public passwordRecoveryForm: FormGroupTypeSafe<IPasswordRecoveryForm>;
  public submitted = false;
  public isLoading = false;

  private sendPasswordRecoverySubscription: Subscription | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService,
    private readonly authService: AuthService
  ) {
    this.passwordRecoveryForm = this.fb.group<IPasswordRecoveryForm>({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    });
  }

  get prf() {
    return this.passwordRecoveryForm.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sendPasswordRecoverySubscription)
      this.sendPasswordRecoverySubscription.unsubscribe();
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
    this.passwordRecoveryForm.reset();
    this.config.closable = true;
  }

  public selectAccountAction(action: AccountActionEnum, dialogHeader: string): void {
    this.onSelectAccountAction.emit({action, dialogHeader});
  }

  public recovery(): void {
    this.messageService.clear();
    this.submitted = true;

    if (this.passwordRecoveryForm.invalid) {
      if (this.prf.email.invalid) return this.focus(this.emailInput);
      return;
    }

    this.isLoading = true;
    this.config.closable = false;
    const {email} = this.passwordRecoveryForm.value;
    this.sendPasswordRecoverySubscription = this.authService.sendPasswordRecovery({
      email
    }).subscribe((data: SendPasswordRecoveryResult) => {
      if (data) {
        if (data.success) {
          this.notify('success', 'Sucesso', data.message, true);
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
