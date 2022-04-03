import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {FormControl, Validators} from '@angular/forms';
import {LogoutResult} from '../../../../../../domain/auth/models/results/logout.result';
import {PetService} from '../../../../services/pet.service';
import {AuthService} from '../../../../../auth/services/auth.service';
import {Subscription} from 'rxjs';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CreatePetResult} from '../../../../../../domain/pet/models/results/create-pet.result';
import {PetsResult} from '../../../../../../domain/pet/models/results/pets.result';
import {IPetRegistrationForm} from '../../../../../../domain/pet/models/forms/ipet-registration.form';
import {PetGenderResult} from '../../../../../../domain/shared/services/models/results/pet-gender.result';
import {SelectItem} from 'primeng/api';
import {PetResult} from '../../../../../../domain/pet/models/results/pet.result';
import {UpdatePetResult} from '../../../../../../domain/pet/models/results/update-pet.result';

@Component({
  selector: 'app-pet-registration',
  templateUrl: './pet-registration.component.html',
  styleUrls: ['./pet-registration.component.scss']
})
export class PetRegistrationComponent implements OnInit, OnDestroy {
  private registerPetSubscription: Subscription | undefined;
  private updatePetSubscription: Subscription | undefined;
  private getPetSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  public registerForm: FormGroupTypeSafe<IPetRegistrationForm>;
  public pet: PetsResult | undefined;
  public petId: string | undefined;
  public optPetGenders: SelectItem[] = [];
  public text: string = '';
  public img: string | ArrayBuffer | null = '';
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public modalHeight: number = 0;

  constructor(
    private readonly petService: PetService,
    private readonly authService: AuthService,
    private readonly fb: FormBuilderTypeSafe,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    if (this.config.data) this.getConfigData(this.config);

    this.registerForm = this.fb.group<IPetRegistrationForm>({
      id: new FormControl(''),
      img: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      petGenderId: new FormControl('', [Validators.required]),
      breed: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  private getConfigData(config: DynamicDialogConfig): void {
    this.petId = this.config.data.id;
    this.optPetGenders = this.config.data.petGenders.map((item: PetGenderResult) => {
      return {
        label: item.description,
        value: item.id
      }
    });
  }

  get rf() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    if (this.petId) {
      this.getPetSubscription = this.getPetById(this.petId);
    }
  }

  private getPetById(id: string): Subscription {
    this.isLoading = true;
    return this.petService.getPet({
      id
    }).subscribe((pet: PetResult) => {
      if(pet) {
        this.rf.id.setValue(pet.id);
        this.img = pet.img;
        this.rf.img.setValue(pet.img);
        this.rf.name.setValue(pet.name);
        this.rf.petGenderId.setValue(pet.petGenderId);
        this.rf.breed.setValue(pet.breed);
        this.text = pet.description;
        this.rf.description.setValue(pet.description);
      }
      this.isLoading = false;
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  public unSubscribe(): void {
    if (this.updatePetSubscription) this.updatePetSubscription.unsubscribe();
    if (this.registerPetSubscription) this.registerPetSubscription.unsubscribe();
    if (this.getPetSubscription) this.getPetSubscription.unsubscribe();
    if (this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  public onSelectFile(event: any): void {
    const file = event.currentFiles[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img = reader.result;
        this.rf.img.setValue(this.img);
      };
      reader.onerror = function (error: ProgressEvent<FileReader>) {
      };
    }
  }

  public trySubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if(this.petId)
      this.update();
    else
      this.register();
  }

  private register(): void {
    const {img, name, petGenderId, breed, description} = this.registerForm.value;
    this.isLoading = true;
    this.registerPetSubscription = this.petService.createPet({
      img,
      name,
      petGenderId,
      breed,
      description
    }).subscribe((data: CreatePetResult) => {
      if (data) {
        if (data.success) {
          this.pet = {id: data.id, img, name, inDonation: false}
          this.close(this.pet);
        }
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isLoading = false;
    });
  }

  private update(): void {
    const {id, img, name, petGenderId, breed, description} = this.registerForm.value;
    this.isLoading = true;
    this.updatePetSubscription = this.petService.updatePet({
      id,
      img,
      name,
      petGenderId,
      breed,
      description
    }).subscribe((data: UpdatePetResult) => {
      if (data) {
        if (data.success) {
          this.pet = {id, img, name, inDonation: false}
          this.close(this.pet);
        }
      }
    }, (error) => {
      if (error.status === 401) {
        this.logout();
      }
      this.isLoading = false;
    });
  }

  public close(pet?: PetsResult): void {
    this.ref.close(pet);
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

  private getPet(id: string): void {
    this.getPetSubscription = this.petService.getPet({id})
      .subscribe((pet: PetResult) => {
        if (pet) {

        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  public getModalHeight(): number {
    return this.getScreenHeight() - 260;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenWidth(): number {
    return window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  public getScreenHeight(): number {
    return window.innerHeight;
  }
}
