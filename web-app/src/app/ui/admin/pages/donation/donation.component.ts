import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {DonationService} from '../../services/donation.service';
import {forkJoin, Subscription} from 'rxjs';
import {ConfigService} from '../../../shared/services/config.service';
import {ConfirmationService, Message, MessageService, SelectItem} from 'primeng/api';
import {AbstractControlTypeSafe, FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {FormControl} from '@angular/forms';
import {DialogService} from 'primeng/dynamicdialog';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {DonationResult} from '../../../../domain/donation/models/results/donation.result';
import {finalize} from 'rxjs/operators';
import {StateResult} from '../../../../domain/shared/services/models/results/state.result';
import {PetTypeResult} from '../../../../domain/shared/services/models/results/pet-type.result';
import {PetGenderResult} from '../../../../domain/shared/services/models/results/pet-gender.result';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {DonationDetailComponent} from './components/donation-detail/donation-detail.component';
import {SignalDonationResult} from '../../../../domain/donation/models/results/signal-donation.result';

interface FormFilter {
  petTypeId: string;
  petGenderId: string;
  state: string;
}

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  private forkSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;
  private signalDonationSubscription: Subscription | undefined;
  private getThirdDonationsSubscription: Subscription | undefined;

  public formFilter: FormGroupTypeSafe<FormFilter>;

  public optPetTypes: SelectItem[] = [];
  public optPetGenders: SelectItem[] = [];
  public optStates: SelectItem[] = [];

  public user: AuthenticatedUserModel;

  public donations: DonationResult[];
  public messages: Message[] = [];

  public isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly donationService: DonationService,
    private readonly configService: ConfigService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.formFilter = this.fb.group<FormFilter>({
      petTypeId: new FormControl(''),
      petGenderId: new FormControl(''),
      state: new FormControl(''),
    });

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
      this.getDonations(new Date());
      this.forkSubscription = this.getConfig();
    } else {
      this.messages.push({
        severity: 'info',
        summary: 'Importante',
        detail: 'Seu perfil está incompleto, por favor preencha as informações obrigatórias para utilizar os serviços.'
      });
    }
  }

  private getConfig(): Subscription {
    return forkJoin({
      petTypes: this.configService.getPetTypes(),
      petGenders: this.configService.getPetGenders(),
      states: this.configService.getStates(),
    })
      .pipe(
        finalize(() => {
        }))
      .subscribe((res) => {
        if (res) {
          this.optStates = res.states.map((state: StateResult) => {
            return {
              label: state.description, value: state.initials
            };
          });

          this.optPetTypes = res.petTypes.map((petType: PetTypeResult) => {
            return {
              label: petType.description, value: petType.id
            };
          });

          this.optPetGenders = res.petGenders.map((petGender: PetGenderResult) => {
            return {
              label: petGender.description, value: petGender.id
            };
          });
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao processar a solicitação, tente novamente!'
          });
      });
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

  private signalDonation(donationId: string): void {
    this.signalDonationSubscription = this.donationService.signalDonation({
      donationId
    }).subscribe((data: SignalDonationResult) => {
      if (data) {
        if (data.success) {
          const toDelete = new Set([donationId]);
          this.donations = this.donations.filter(obj => !toDelete.has(obj.id));
        }

        this.messageService.add({
          severity: data.success ? 'success' : 'warn',
          detail: data.message
        });
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      } else {
        this.messageService.add({
          severity: 'error',
          detail: 'Erro ao processar a solicitação, tente novamente!'
        });
      }
    })
  }

  public getDonations(currentDate?: Date): void {
    const {petTypeId, petGenderId, state} = this.formFilter.value;

    this.isLoading = true;
    this.getThirdDonationsSubscription = this.donationService.getThirdDonations({
      state: currentDate ? this.user.state : state,
      petTypeId,
      petGenderId,
      currentDate: currentDate ? currentDate.toLocaleDateString() : ''
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
      }, (err) => {
        if (err.status === 401) {
          this.logout();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao processar a solicitação, tente novamente!'
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.authSubscription)
      this.authSubscription.unsubscribe();

    if (this.forkSubscription)
      this.forkSubscription.unsubscribe();

    if (this.logoutSubscription)
      this.logoutSubscription.unsubscribe();

    if (this.signalDonationSubscription)
      this.signalDonationSubscription.unsubscribe();

    if (this.getThirdDonationsSubscription)
      this.getThirdDonationsSubscription.unsubscribe()
  }

  public onClickConfirmSignal(donation: DonationResult): void {
    this.confirmationService.confirm({
      header: `${donation.petName}`,
      icon: `fas fa-heart`,
      message: `<strong>Deseja demonstrar interesse pela doação?</strong>`,
      accept: () => {
        this.signalDonation(donation.id);
      },
      reject: () => {
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

  public getSelectItemLabel(id: string, array: SelectItem[]): string {
    return array.find(f => f.value === id).label;
  }

  public removeFilter(event: Event, control: AbstractControlTypeSafe<string>): void {
    control.setValue('');
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
