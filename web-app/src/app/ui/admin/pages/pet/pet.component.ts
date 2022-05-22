import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PetService} from '../../services/pet.service';
import {PetsResult} from '../../../../domain/pet/models/results/pets.result';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../auth/services/auth.service';
import {forkJoin, Subscription} from 'rxjs';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DeletePetResult} from '../../../../domain/pet/models/results/delete-pet.result';
import {DialogService} from 'primeng/dynamicdialog';
import {PetRegistrationComponent} from './components/pet-registration/pet-registration.component';
import {ConfigService} from '../../../shared/services/config.service';
import {PetGenderResult} from '../../../../domain/shared/services/models/results/pet-gender.result';
import {DonationService} from '../../services/donation.service';
import {DonatePetResult} from '../../../../domain/donation/models/results/donate-pet.result';
import {DonationResult} from '../../../../domain/donation/models/results/donation.result';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit, OnDestroy {
  private forkSubscription: Subscription | undefined;
  private deletePetSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;
  private openRegistrationSubscription: Subscription | undefined;
  private openEditSubscription: Subscription | undefined;
  private donatePetSubscription: Subscription | undefined;

  public pets: PetsResult[] = [];
  public petGenders: PetGenderResult[] = [];
  public isLoading: boolean = true;
  public isRequesting: boolean = false;
  public display: boolean = false;


  constructor(
    private readonly petService: PetService,
    private readonly donationService: DonationService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.forkSubscription = this.getDataFromApi();
  }

  private getDataFromApi(): Subscription {
    return forkJoin({
      pets: this.petService.getPets(),
      petGenders: this.configService.getPetGenders()
    }).subscribe((res) => {
      this.pets = res.pets;
      this.petGenders = res.petGenders;
      this.isLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.forkSubscription) this.forkSubscription.unsubscribe();
    if (this.deletePetSubscription) this.deletePetSubscription.unsubscribe();
    if (this.openRegistrationSubscription) this.openRegistrationSubscription.unsubscribe();
    if (this.openEditSubscription) this.openEditSubscription?.unsubscribe();
  }

  public openRegistration(): void {
    const ref = this.dialogService.open(PetRegistrationComponent, {
      data: {
        id: '',
        petGenders: this.petGenders
      },
      closable: true,
      showHeader: true,
      header: 'Cadastrando Pet...',
      width: this.isMobile() ? '90%' : '50%',
      // height: window.innerHeight.toString() + 'px'
    });

    this.openRegistrationSubscription = ref.onClose.subscribe((pet) => {
      if (pet) {
        this.pets = [pet].concat([...this.pets]);
      }
    });
  }

  public openEdit(id: string): void {
    const ref = this.dialogService.open(PetRegistrationComponent, {
      data: {
        id,
        petGenders: this.petGenders
      },
      closable: true,
      showHeader: true,
      header: 'Editando Pet...',
      width: this.isMobile() ? '90%' : '50%',
      // height: window.innerHeight.toString() + 'px'
    });

    this.openEditSubscription = ref.onClose.subscribe((data) => {
      if (data) {
        this.pets.forEach((pet: PetsResult) => {
          if (pet.id === id) {
            pet.name = data.name;
            pet.img = data.img;
          }
        })
      }
    });
  }

  public confirmDonation(pet: PetsResult): void {
    this.confirmationService.confirm({
      header: `${pet.name}`,
      icon: `fas fa-hand-holding-heart`,
      message: `<strong>Deseja colocar este Pet para adoação?</strong>`,
      accept: () => {
        this.donatePet(pet.id);
      },
      reject: () => {
      }
    });
  }

  private donatePet(id: string) {
    this.isRequesting = true;
    this.donatePetSubscription = this.donationService.donatePet({
      petId: id
    }).subscribe((data: DonatePetResult) => {
      if (data) {
        if(data.success) {
          this.pets.forEach((pet: PetsResult) => {
            if(pet.id === id) {
              pet.inDonation = true;
            }
          });
        }
        this.messageService.add({
          severity: data.success ? 'success' : 'error',
          detail: data.message,
          life: 100000
        });
      }
      this.isRequesting = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isRequesting = false;
    })
  }

  public viewDonation(pet: PetsResult) {
    this.donationService.viewDonation({
      donationId: pet.donationId
    }).subscribe((data: DonationResult ) => {
      if(data) {
        console.log(data);
      }
    });
  }

  public confirmDelete(pet: PetsResult): void {
    this.confirmationService.confirm({
      header: `${pet.name}`,
      icon: `fas fa-folder-minus`,
      message: `<strong class="text-danger">Atenção: Esta operação não pode ser desfeita.</strong> <br> <strong>Deseja realmente eliminar este cadastro?</strong> <br>`,
      accept: () => {
        this.deletePet(pet.id)
      },
      reject: () => {
      }
    });
  }

  private deletePet(id: string): void {
    this.isRequesting = true;
    this.deletePetSubscription = this.petService.deletePet({
      id
    }).subscribe((data: DeletePetResult) => {
      if (data) {
        if (data.success) {
          const toDelete = new Set([id]);
          this.pets = this.pets.filter(obj => !toDelete.has(obj.id));
        }
      }
      this.isRequesting = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isRequesting = false;
    });
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

  public isMobile(): boolean {
    return this.getScreenWidth() < 1024;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }
}
