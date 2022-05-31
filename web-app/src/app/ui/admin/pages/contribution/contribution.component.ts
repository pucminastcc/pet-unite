import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {PetService} from '../../services/pet.service';
import {DonationService} from '../../services/donation.service';
import {ConfigService} from '../../../shared/services/config.service';
import {AuthService} from '../../../auth/services/auth.service';
import {DialogService} from 'primeng/dynamicdialog';
import {Subscription} from 'rxjs';
import {DonationResult} from '../../../../domain/donation/models/results/donation.result';
import {finalize} from 'rxjs/operators';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {DeleteDonationResult} from '../../../../domain/donation/models/results/delete-donation.result';
import {DonationDetailComponent} from '../donation/components/donation-detail/donation-detail.component';
import {DonationStatusComponent} from '../donation/components/donation-status/donation-status.component';
import {ManagerService} from '../../services/manager.service';
import {UserAccountResult} from '../../../../domain/manager/models/results/user-account.result';

enum TabViewIndex {
  UserDonations = 0,
  FlaggedDonations = 1,
}

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;
  private getUserDonationsSubscription: Subscription | undefined;
  private getFlaggedDonationsSubscription: Subscription | undefined;
  private deleteDonationSubscription: Subscription | undefined;
  private onClickUpdateDonationStatusSubscription: Subscription | undefined;

  public user: AuthenticatedUserModel | undefined;
  public interestedUser: UserAccountResult | undefined;
  public donation: DonationResult | undefined;
  public userDonations: DonationResult[] | undefined;
  public flaggedDonations: DonationResult[] | undefined;
  public messages: Message[] = [];

  public activeIndex: number = 0;
  public isLoading: boolean = false;
  public displayInterestedUser: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly donationService: DonationService,
    private readonly managerService: ManagerService,
    private readonly petService: PetService,
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.authSubscription = this.authService.getAuthenticatedUser()
      .subscribe((result: AuthenticatedUserModel) => {
        if (result) {
          this.user = result;
        }
      });
  }

  ngOnInit(): void {
    if (this.user.filledProfile) {
      this.getUserDonations();
    } else {
      this.messages.push({
        severity: 'info',
        summary: 'Importante',
        detail: 'Seu perfil está incompleto, por favor preencha as informações obrigatórias para utilizar os serviços.'
      });
    }
  }

  private getUserDonations(): void {
    this.isLoading = true;
    this.getUserDonationsSubscription = this.donationService.getUserDonations()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: DonationResult[]) => {
        if (result) {
          this.userDonations = result;
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

  private getFlaggedDonations(): void {
    this.isLoading = true;
    this.getFlaggedDonationsSubscription = this.donationService.getFlaggedDonations({
      donatedToInstitution: false
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result: DonationResult[]) => {
        if (result) {
          this.flaggedDonations = result;
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

  public getInterestedUser(userId: string, donation: DonationResult): void {
    this.donation = donation;

    this.managerService.getUserAccount({
      id: userId
    })
      .pipe(
        finalize(() => {
        })
      )
      .subscribe((result: UserAccountResult) => {
        if (result) {
          this.displayInterestedUser = true;
          this.interestedUser = result;
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

  private deleteDonation(donationId: string, petId: string): void {
    this.deleteDonationSubscription = this.donationService.deleteDonation({
      donationId,
      petId
    }).subscribe((data: DeleteDonationResult) => {
      if (data) {
        if (data.success) {
          const toDelete = new Set([donationId]);
          this.userDonations = this.userDonations.filter(obj => !toDelete.has(obj.id));
        }

        this.messageService.add({
          severity: data.success ? 'success' : 'error',
          detail: data.message,
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

    if (this.getUserDonationsSubscription)
      this.getUserDonationsSubscription.unsubscribe();

    if (this.deleteDonationSubscription)
      this.deleteDonationSubscription.unsubscribe();

    if (this.onClickUpdateDonationStatusSubscription)
      this.onClickUpdateDonationStatusSubscription.unsubscribe();
  }

  public handleChange(e): void {
    this.activeIndex = e.index;

    switch (this.activeIndex) {
      case TabViewIndex.UserDonations:
        this.getUserDonations();
        return;

      case TabViewIndex.FlaggedDonations:
        this.getFlaggedDonations();
        return;
    }
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
        if (this.activeIndex === TabViewIndex.UserDonations) {
          this.userDonations.forEach((userDonation: DonationResult) => {
            if (data.id === userDonation.id) {
              userDonation.status = data.status;
              userDonation.statusSeverity = data.statusSeverity;
              userDonation.donated = data.donated;
              userDonation.rating = data.rating;
              userDonation.feedback = data.feedback;
            }
          });
        } else {
          this.flaggedDonations.forEach((flaggedDonation: DonationResult) => {
            if (data.id === flaggedDonation.id) {
              flaggedDonation.status = data.status;
              flaggedDonation.statusSeverity = data.statusSeverity;
              flaggedDonation.donated = data.donated;
              flaggedDonation.rating = data.rating;
              flaggedDonation.feedback = data.feedback;
            }
          });
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

  public onClickRemove(donation: DonationResult): void {
    this.confirmationService.confirm({
      header: `${donation.petName}`,
      icon: `fas fa-trash`,
      message: `<strong>Deseja remover esta doação?</strong>`,
      accept: () => {
        this.deleteDonation(donation.id, donation.petId);
      },
      reject: () => {
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

  public isMobile(): boolean {
    return window.innerWidth < 1024;
  }
}
