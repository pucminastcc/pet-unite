import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
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
import {finalize} from 'rxjs/operators';
import {PetTypeResult} from '../../../../../../domain/shared/services/models/results/pet-type.result';
import {Editor} from 'primeng/editor';

@Component({
  selector: 'app-pet-registration',
  templateUrl: './pet-registration.component.html',
  styleUrls: ['./pet-registration.component.scss']
})
export class PetRegistrationComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('editor', {static: false}) editor: Editor;

  private registerPetSubscription: Subscription | undefined;
  private updatePetSubscription: Subscription | undefined;
  private getPetSubscription: Subscription | undefined;
  private logoutSubscription: Subscription | undefined;

  public registerForm: FormGroupTypeSafe<IPetRegistrationForm>;
  public pet: PetsResult | undefined;
  public petId: string | undefined;
  public optPetGenders: SelectItem[] = [];
  public optPetTypes: SelectItem[] = [];
  public optAgeTypes: SelectItem[] = [];
  public text: string = '';
  public img: string | ArrayBuffer | null = '';
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public modalHeight: number = 0;

  constructor(
    private readonly petService: PetService,
    private readonly authService: AuthService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly ref: DynamicDialogRef,
    private readonly config: DynamicDialogConfig
  ) {
    if (this.config.data) this.getConfigData(this.config);

    this.registerForm = this.fb.group<IPetRegistrationForm>({
      id: new FormControl(''),
      img: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      petGenderId: new FormControl('', [Validators.required]),
      petTypeId: new FormControl('', [Validators.required]),
      breed: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rateLikesChild: new FormControl('',),
      rateLikesTours: new FormControl('',),
      rateFriendly: new FormControl('',),
      rateTraining: new FormControl('',),
      age: new FormControl('', [Validators.required]),
      ageType: new FormControl('', [Validators.required]),
    });
  }

  private getConfigData(config: DynamicDialogConfig): void {
    this.petId = this.config.data.id;

    this.optPetGenders = this.config.data.petGenders.map((item: PetGenderResult) => {
      return {
        label: item.description, value: item.id
      }
    });

    this.optPetTypes = this.config.data.petTypes.map((item: PetTypeResult) => {
      return {
        label: item.description, value: item.id
      }
    });

    this.optAgeTypes = [
      {label: 'Dia(s)', value: 'dias'},
      {label: 'Mês(es)', value: 'meses'},
      {label: 'Ano(s)', value: 'anos'},
    ];
  }

  get rf() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    if (this.petId) {
      this.getPetSubscription = this.getPet(this.petId);
    }
  }

  private getPet(id: string): Subscription {
    this.isLoading = true;
    return this.petService.getPet({
      id
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((pet: PetResult) => {
        if (pet) {
          this.img = pet.img;
          this.text = pet.description;

          this.registerForm.patchValue({
            id: pet.id,
            img: pet.img,
            name: pet.name,
            petGenderId: pet.petGenderId,
            petTypeId: pet.petTypeId,
            breed: pet.breed,
            description: pet.description,
            rateLikesChild: pet.rateLikesChild,
            rateLikesTours: pet.rateLikesTours,
            rateFriendly: pet.rateFriendly,
            rateTraining: pet.rateTraining,
            age: Number(pet.age.split(' ')[0]),
            ageType: pet.age.split(' ')[1],
          });
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  ngAfterContentChecked(): void {
    if (this.editor) {
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
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

  public onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.petId)
      this.update();
    else
      this.register();
  }

  private register(): void {
    const {
      img, name, petGenderId, petTypeId, breed, description, rateLikesChild, rateLikesTours, rateFriendly, rateTraining,
      age, ageType
    } = this.registerForm.value;

    const formattedAge = `${age} ${ageType}`

    this.isLoading = true;
    this.registerPetSubscription = this.petService.createPet({
      img, name, petGenderId, petTypeId, breed, description, rateLikesChild, rateLikesTours, rateFriendly, rateTraining,
      age: formattedAge
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: CreatePetResult) => {
        if (data) {
          if (data.success) {
            this.pet = {id: data.id, img, name, inDonation: false}
            this.onClose(this.pet);
          }
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  private update(): void {
    const {
      id, img, name, petGenderId, petTypeId, breed, description, rateLikesChild, rateLikesTours, rateFriendly,
      rateTraining, age, ageType
    } = this.registerForm.value;

    const formattedAge = `${age} ${ageType}`

    this.isLoading = true;
    this.updatePetSubscription = this.petService.updatePet({
      id, img, name, petGenderId, petTypeId, breed, description, rateLikesChild, rateLikesTours, rateFriendly,
      rateTraining, age: formattedAge
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: UpdatePetResult) => {
        if (data) {
          if (data.success) {
            this.pet = {id, img, name, inDonation: false}
            this.onClose(this.pet);
          }
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
      });
  }

  public onClose(pet?: PetsResult): void {
    this.ref.close(pet);
  }

  private logout(): void {
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

  public getModalHeight(): number {
    return this.getScreenHeight() - 265;
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
