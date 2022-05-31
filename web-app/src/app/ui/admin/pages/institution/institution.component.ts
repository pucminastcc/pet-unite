import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DonationService} from '../../services/donation.service';
import {AuthService} from '../../../auth/services/auth.service';
import {Subscription} from 'rxjs';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {DonationResult} from '../../../../domain/donation/models/results/donation.result';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {finalize} from 'rxjs/operators';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {DonationDetailComponent} from '../donation/components/donation-detail/donation-detail.component';
import {DonationStatusComponent} from '../donation/components/donation-status/donation-status.component';

interface FormFilter {
}

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;
  private getFlaggedDonationsSubscription: Subscription | undefined;
  private onClickUpdateDonationStatusSubscription: Subscription | undefined;

  public formFilter: FormGroupTypeSafe<FormFilter>;

  public user: AuthenticatedUserModel;

  public messages: Message[] = [];

  public donations: DonationResult[];
  public isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly donationService: DonationService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.formFilter = this.fb.group<FormFilter>({});

    this.authSubscription = this.authService.getAuthenticatedUser()
      .subscribe((result: AuthenticatedUserModel) => {
        if (result) {
          this.user = result;
        }
      });
  }

  get ff() {
    return this.formFilter.controls;
  }

  ngOnInit(): void {
    if (this.user.filledProfile) {
      this.getFlaggedDonations();
    } else {
      this.messages.push({
        severity: 'info',
        summary: 'Importante',
        detail: 'Seu perfil está incompleto, por favor preencha as informações obrigatórias para utilizar os serviços.'
      });
    }
  }

  private getFlaggedDonations(): void {
    this.isLoading = true;
    this.getFlaggedDonationsSubscription = this.donationService.getFlaggedDonations({
      donatedToInstitution: true
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: DonationResult[]) => {
        if (result) {
          this.donations = result;
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
  }

  public onClickViewDonation(donation: DonationResult): void {
    const ref = this.dialogService.open(DonationDetailComponent, {
      data: {
        user: this.user,
        donationId: donation.id,
      },
      closable: true,
      showHeader: true,
      header: 'Visualizando...',
      width: this.isMobile() ? '90%' : '70%',
    });
  }

  public onClickUpdateDonationStatus(donation: DonationResult, rating: boolean = false): void {
    const ref = this.dialogService.open(DonationStatusComponent, {
      data: {
        user: this.user,
        donation: donation,
        rating
      },
      closable: true,
      showHeader: true,
      header: rating ? 'Avaliando...' : 'Alterando Status...',
      width: this.isMobile() ? '90%' : '40%',
    });

    this.onClickUpdateDonationStatusSubscription = ref.onClose.subscribe((data) => {
      if (data) {
        this.donations.forEach((donation: DonationResult) => {
          if (data.id === donation.id) {
            donation.status = data.status;
            donation.statusSeverity = data.statusSeverity;
            donation.donated = data.donated;
          }
        });
      }
    });
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

  public getDistanceFromLatLonInKm(position1: { lat: number, lng: number }, position2: { lat: number, lng: number }): number {
    const deg2rad = function (deg: number) {
        return deg * (Math.PI / 180);
      },
      R = 6371,
      dLat = deg2rad(position2.lat - position1.lat),
      dLng = deg2rad(position2.lng - position1.lng),
      a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(deg2rad(position1.lat))
        * Math.cos(deg2rad(position1.lat))
        * Math.sin(dLng / 2) * Math.sin(dLng / 2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number(((R * c)).toFixed(1));
  }

  public isMobile(): boolean {
    return this.getScreenWidth() < 1024;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }
}
