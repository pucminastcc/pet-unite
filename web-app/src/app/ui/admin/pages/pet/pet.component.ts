import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PetService} from '../../services/pet.service';
import {PetsResult} from '../../../../domain/pet/models/results/pets.result';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../auth/services/auth.service';
import {forkJoin, Subscription} from 'rxjs';
import {ConfirmationService} from 'primeng/api';
import {DeletePetResult} from '../../../../domain/pet/models/results/delete-pet.result';
import {DialogService} from 'primeng/dynamicdialog';
import {PetRegistrationComponent} from './components/pet-registration/pet-registration.component';
import {ConfigService} from '../../../shared/services/config.service';
import {PetGenderResult} from '../../../../domain/shared/services/models/results/pet-gender.result';

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

  public pets: PetsResult[] = [];
  public petGenders: PetGenderResult[] = [];
  public isLoading: boolean = true;
  public display: boolean = false;


  constructor(
    private readonly petService: PetService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService
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
      closable: false,
      showHeader: true,
      width: this.isMobile() ? '90%' : '50%',
      height: window.innerHeight.toString() + 'px'
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
      closable: false,
      showHeader: true,
      width: this.isMobile() ? '90%' : '50%',
      height: window.innerHeight.toString() + 'px'
    });

    this.openEditSubscription = ref.onClose.subscribe((data) => {
      if (data) {
        this.pets.forEach((pet: PetsResult) => {
          if(pet.id === id) {
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
      message: `Deseja colocar este Pet para adoação?`,
      accept: () => {
        this.donatePet(pet.id);
      },
      reject: () => {
      }
    });
  }

  private donatePet(id: string) {

  }

  public confirmDelete(pet: PetsResult): void {
    this.confirmationService.confirm({
      header: `${pet.name}`,
      icon: `fas fa-folder-minus`,
      message: `Deseja excluir este registro?`,
      accept: () => {
        this.deletePet(pet.id)
      },
      reject: () => {
      }
    });
  }

  private deletePet(id: string): void {
    this.deletePetSubscription = this.petService.deletePet({
      id
    }).subscribe((data: DeletePetResult) => {
      if (data) {
        if (data.success) {
          const toDelete = new Set([id]);
          this.pets = this.pets.filter(obj => !toDelete.has(obj.id));
        }
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
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
      }, (error) => {
        if (error.status === 401) {
          this.logout();
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
