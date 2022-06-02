import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticatedUserModel} from '../../../../../../domain/auth/models/authenticated-user.model';
import {AuthService} from '../../../../../auth/services/auth.service';
import {DonationService} from '../../../../services/donation.service';
import {LogoutResult} from '../../../../../../domain/auth/models/results/logout.result';
import {MessageService, SelectItem} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {FormControl, Validators} from '@angular/forms';
import {DonationResult} from '../../../../../../domain/donation/models/results/donation.result';
import {UpdateDonationStatusResult} from '../../../../../../domain/donation/models/results/update-donation-status.result';
import {finalize} from 'rxjs/operators';

interface StatusForm {
  data: any;
}

interface RatingForm {
  rating: number;
  feedback: string;
}

@Component({
  selector: 'app-donation-status',
  templateUrl: './donation-status.component.html',
  styleUrls: ['./donation-status.component.scss']
})
export class DonationStatusComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;
  private updateDonationStatusSubscription: Subscription | undefined;

  public user: AuthenticatedUserModel | undefined;
  private donationId: string;
  private donation: DonationResult;
  public optStatus: SelectItem[] = [];
  public form: FormGroupTypeSafe<StatusForm> | FormGroupTypeSafe<RatingForm> | undefined;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public rating: boolean = false;
  public feedback: string = null;

  constructor(
    private readonly authService: AuthService,
    private readonly donationService: DonationService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
  ) {
    if (this.config.data) {
      this.user = this.config.data.user;
      this.donation = this.config.data.donation;
      this.rating = this.config.data.rating;
    }

    if (this.rating) {
      this.form = this.fb.group<RatingForm>({
        rating: new FormControl('', [Validators.required]),
        feedback: new FormControl('', [Validators.required]),
      });
    } else {
      this.form = this.fb.group<StatusForm>({
        data: new FormControl('', [Validators.required])
      });
    }
  }

  get fc() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.optStatus = [
      {
        label: 'Doação Concluída',
        value: {status: 'Doação concluída', statusSeverity: 'success', donated: true}
      }
    ];
  }

  public updateDonation(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let data;

    if (this.rating) {
      data = {
        rating: this.form.get('rating').value,
        feedback: this.form.get('feedback').value,
      }
    } else {
      data = this.form.get('data').value;
    }

    this.isLoading = true;
    this.updateDonationStatusSubscription = this.donationService.updateDonationStatus({
      donationId: this.donation.id,
      data
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: UpdateDonationStatusResult) => {
      if (result) {
        if (result.success) {
          this.donation = {
            ...this.donation,
            ...data,
          }
          this.onClose(this.donation);
        }

        this.messageService.add({
          severity: result.success ? 'success' : 'error',
          detail: result.message,
        });
      }
    }, (error) => {
      error.status === 401 ?
        this.logout() :
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao processar a solicitação, tente novamente!'
        });
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.authSubscription)
      this.authSubscription.unsubscribe();

    if (this.logoutSubscription)
      this.logoutSubscription.unsubscribe();

    if (this.updateDonationStatusSubscription)
      this.updateDonationStatusSubscription.unsubscribe();
  }

  public onClose(donation?: DonationResult): void {
    this.ref.close(donation);
  }

  private logout(): void {
    this.logoutSubscription = this.authService.logout()
      .subscribe((data: LogoutResult) => {
        if (data) {
          if (data.success) {
            window.location.href = '/';
          }
        }
      });
  }

  public isMobile(): boolean {
    return window.innerWidth < 1024;
  }
}
