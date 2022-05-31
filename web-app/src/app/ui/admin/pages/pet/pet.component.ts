import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PetService} from '../../services/pet.service';
import {PetsResult} from '../../../../domain/pet/models/results/pets.result';
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {AuthService} from '../../../auth/services/auth.service';
import {forkJoin, Subscription} from 'rxjs';
import {ConfirmationService, Message, MessageService, SelectItem} from 'primeng/api';
import {DeletePetResult} from '../../../../domain/pet/models/results/delete-pet.result';
import {DialogService} from 'primeng/dynamicdialog';
import {PetRegistrationComponent} from './components/pet-registration/pet-registration.component';
import {ConfigService} from '../../../shared/services/config.service';
import {PetGenderResult} from '../../../../domain/shared/services/models/results/pet-gender.result';
import {DonationService} from '../../services/donation.service';
import {DonatePetResult} from '../../../../domain/donation/models/results/donate-pet.result';
import {PetTypeResult} from '../../../../domain/shared/services/models/results/pet-type.result';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {finalize} from 'rxjs/operators';
import {ManagerService} from '../../services/manager.service';
import {UserBaseResult} from '../../../../domain/manager/models/results/user-base.result';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {FormControl} from '@angular/forms';

interface FormFilter {
  institutionId: string;
}

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;
  private forkSubscription: Subscription | undefined;
  private getInstitutionsSubscription: Subscription | undefined;
  private donatePetSubscription: Subscription | undefined;
  private deletePetSubscription: Subscription | undefined;
  private onClickRegisterSubscription: Subscription | undefined;
  private onClickUpdateSubscription: Subscription | undefined;

  public user: AuthenticatedUserModel;
  public formFilter: FormGroupTypeSafe<FormFilter>;

  public optInstitution: SelectItem[] = [];
  public messages: Message[] = [];

  public petGenders: PetGenderResult[] = [];
  public petTypes: PetTypeResult[] = [];
  public pets: PetsResult[] = [];
  public pet: PetsResult | undefined;

  public isLoading: boolean = false;
  public isSearchingInstitution: boolean = false;
  public isRequesting: boolean = false;
  public display: boolean = false;

  constructor(
    private readonly petService: PetService,
    private readonly donationService: DonationService,
    private readonly managerService: ManagerService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilderTypeSafe,
  ) {
    this.formFilter = this.fb.group<FormFilter>({
      institutionId: new FormControl('')
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
    this.user.filledProfile ?
      this.forkSubscription = this.getConfigData() :
      this.messages.push({
        severity: 'info',
        summary: 'Importante',
        detail: 'Seu perfil está incompleto, por favor preencha as informações obrigatórias para utilizar os serviços.'
      });
  }

  private getConfigData(): Subscription {
    this.isLoading = true;
    return forkJoin({
      pets: this.petService.getPets(),
      petGenders: this.configService.getPetGenders(),
      petTypes: this.configService.getPetTypes(),
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result) => {
        if (result) {
          this.pets = result.pets;
          this.petGenders = result.petGenders;
          this.petTypes = result.petTypes;
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

  private getInstitutions(state?: string): void {
    this.isSearchingInstitution = true;
    this.getInstitutionsSubscription = this.managerService.getUsers({
      isInstitution: true,
      state
    })
      .pipe(
        finalize(() => {
          this.isSearchingInstitution = false;
        })
      )
      .subscribe((result: UserBaseResult[]) => {
        if (result) {
          this.optInstitution = result.map((item: UserBaseResult) => {
            return {
              label: item.username,
              value: item.id
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

  public donatePet(id: string): void {
    const {institutionId} = this.formFilter.value;

    this.messageService.clear();
    this.isRequesting = true;
    this.donatePetSubscription = this.donationService.donatePet({
      petId: id,
      institutionId: institutionId ?? ''
    })
      .pipe(
        finalize(() => {
          this.isRequesting = false;
        })
      )
      .subscribe((data: DonatePetResult) => {
        if (data) {
          if (data.success) {
            this.pets.forEach((pet: PetsResult) => {
              if (pet.id === id) {
                pet.inDonation = true;
              }
            });
          }

          this.messageService.add({
            severity: data.success ? 'success' : 'warn',
            detail: data.message,
            life: 100000
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

  private deletePet(id: string): void {
    this.isRequesting = true;
    this.deletePetSubscription = this.petService.deletePet({
      id
    })
      .pipe(
        finalize(() => {
          this.isRequesting = false;
        })
      )
      .subscribe((data: DeletePetResult) => {
        if (data) {
          if (data.success) {
            const toDelete = new Set([id]);
            this.pets = this.pets.filter(obj => !toDelete.has(obj.id));
          }
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

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
    if (this.forkSubscription) this.forkSubscription.unsubscribe();
    if (this.getInstitutionsSubscription) this.getInstitutionsSubscription.unsubscribe();
    if (this.donatePetSubscription) this.donatePetSubscription.unsubscribe();
    if (this.deletePetSubscription) this.deletePetSubscription.unsubscribe();
    if (this.onClickRegisterSubscription) this.onClickRegisterSubscription.unsubscribe();
    if (this.onClickUpdateSubscription) this.onClickUpdateSubscription.unsubscribe();
  }

  public onClickRegister(): void {
    const ref = this.dialogService.open(PetRegistrationComponent, {
      data: {
        id: '',
        petGenders: this.petGenders,
        petTypes: this.petTypes,
      },
      closable: true,
      showHeader: true,
      header: 'Cadastrando...',
      width: this.isMobile() ? '90%' : '60%',
    });

    this.onClickRegisterSubscription = ref.onClose.subscribe((pet) => {
      if (pet) {
        this.pets = [pet].concat([...this.pets]);
      }
    });
  }

  public onClickUpdate(id: string): void {
    const ref = this.dialogService.open(PetRegistrationComponent, {
      data: {
        id,
        petGenders: this.petGenders,
        petTypes: this.petTypes,
      },
      closable: true,
      showHeader: true,
      header: 'Editando...',
      width: this.isMobile() ? '90%' : '60%',
    });

    this.onClickUpdateSubscription = ref.onClose.subscribe((data) => {
      if (data) {
        this.pets.forEach((pet: PetsResult) => {
          if (pet.id === id) {
            pet.name = data.name;
            pet.img = data.img;
          }
        });
      }
    });
  }

  public onClickDonate(pet: PetsResult): void {
    this.pet = pet;
    this.display = true;

    if (!this.user.isInstitution) {
      this.getInstitutions(this.user.state);
    }
  }

  public onClickDelete(pet: PetsResult): void {
    const message: string = pet.inDonation ? `Este Pet está em doação, deseja realmente prosseguir?` : `Deseja realmente remover este cadastro?`;

    this.confirmationService.confirm({
      header: `Exclusão de ${pet.name}`,
      icon: `fas fa-folder-minus`,
      message: `<strong class="text-danger">Atenção: Esta operação não pode ser desfeita.</strong> <br> <strong>${message}</strong>`,
      accept: () => {
        this.deletePet(pet.id)
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

  private isMobile(): boolean {
    return this.getScreenWidth() < 1024;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }
}
