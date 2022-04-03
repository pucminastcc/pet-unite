import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {DonationService} from '../../services/donation.service';
import {forkJoin, Subscription} from 'rxjs';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {DonationResult} from '../../../../domain/donation/models/results/donation.result';
import {ConfigService} from '../../../shared/services/config.service';
import {PetGenderResult} from '../../../../domain/shared/services/models/results/pet-gender.result';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {SignalDonationResult} from '../../../../domain/donation/models/results/signal-donation.result';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit, OnDestroy {
  private getDonationsSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  private userId: string | undefined;
  public donations: DonationResult[] = [];
  public myDonations: DonationResult[] = [];
  public flaggedDonations: DonationResult[] = [];
  public allDonations: DonationResult[] = [];
  public optPetGenders: SelectItem[] = [];
  public isLoading: boolean = true;

  constructor(
    private readonly authService: AuthService,
    private readonly donationService: DonationService,
    private readonly configService: ConfigService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  private getDataFromApi(): Subscription {
    this.isLoading = true;
    return forkJoin({
      donations: this.donationService.getDonations(),
      petGenders: this.configService.getPetGenders(),
      user: this.authService.getAuthenticatedUser()
    }).subscribe((res) => {
      if (res) {
        this.userId = res.user.id;
        this.allDonations = res.donations;
        this.donations = this.allDonations.filter(e => e.userId !== this.userId && !e.interestedUserId);
        this.myDonations = this.allDonations.filter(e => e.userId === this.userId);
        this.flaggedDonations = this.allDonations.filter(e => e.interestedUserId === this.userId);
        this.optPetGenders = this.getOptPetGenders(res.petGenders);
      }
      this.isLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isLoading = false;
    });
  }

  private getOptPetGenders(petGenders: PetGenderResult[]): SelectItem[] {
    return petGenders.map((petGender: PetGenderResult) => {
      return {
        label: petGender.description,
        value: petGender.id
      }
    });
  }

  public onChangePetGender(selectItemValue: string): void {
    console.log(selectItemValue);
  }

  public confirmSignal(donation: DonationResult): void {
    this.confirmationService.confirm({
      header: `${donation.petName}`,
      icon: `fas fa-heart`,
      message: `<strong>Deseja demonstrar interesse pela doação?</strong>`,
      accept: () => {
        this.signal(donation.id);
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

  public signal(donationId: string): void {
    this.donationService.signalDonation({
      donationId
    }).subscribe((data: SignalDonationResult) => {
      if (data) {
        if (data.success) {
          const toDelete = new Set([donationId]);
          this.donations = this.donations.filter(obj => !toDelete.has(obj.id));
        }

        this.messageService.add({
          severity: data.success ? 'success' : 'error',
          detail: data.message
        });
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.getDonationsSubscription) this.getDonationsSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  public logout(): void {
    this.logoutSubscription = this.authService.logout()
      .subscribe((data: LogoutResult) => {
        if (data) {
          if (data.success) {
            window.location.href = '/';
          }
        }
      });
  }
}
