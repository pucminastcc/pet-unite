import {Component, HostListener, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DonationResult} from '../../../../../../domain/donation/models/results/donation.result';
import {AuthenticatedUserModel} from '../../../../../../domain/auth/models/authenticated-user.model';
import {DonationService} from '../../../../services/donation.service';
import {finalize} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {LogoutResult} from '../../../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.scss']
})
export class DonationDetailComponent implements OnInit {

  private logoutSubscription: Subscription | undefined;
  private getDonationSubscription: Subscription | undefined;

  public user: AuthenticatedUserModel;
  public donation: DonationResult;
  private donationId: string;
  public isLoading: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly donationService: DonationService,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig,
  ) {
    if (this.config.data) {
      this.user = this.config.data.user;
      this.donationId = this.config.data.donationId;
    }
  }

  ngOnInit(): void {
    this.getDonation();
  }

  private getDonation(): void {
    this.isLoading = true;
    this.getDonationSubscription = this.donationService.getDonation({
      donationId: this.donationId
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: DonationResult) => {
      if (result) {
        this.donation = result;
      }
    }, (error) => {
        if (error.status === 401) {
          this.logout();
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

  public getEditorHeight(value: number): number {
    return window.innerHeight - value;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }
}
