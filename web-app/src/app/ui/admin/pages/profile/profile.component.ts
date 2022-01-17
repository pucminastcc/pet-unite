import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
import {IProfileForm} from '../../../../domain/admin/profile/models/forms/iprofile.form';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/services/auth.service';
import {AuthenticatedUserModel} from '../../../../domain/auth/models/authenticated-user.model';
import {forkJoin, Subscription} from 'rxjs';
import {MessageService, SelectItem} from 'primeng/api';
import {ConfigService} from '../../../shared/services/config.service';
import {PersonTypeResult} from '../../../../domain/shared/services/models/results/person-type.result';
import {ViaCepService} from '../../../shared/services/viacep.service';
import {AddressResult} from '../../../../domain/shared/services/models/results/address.result';
import {UpdateUserResult} from '../../../../domain/auth/models/results/update-user.result';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription | undefined;
  private forkSubscription: Subscription | undefined;
  private addressSubscription: Subscription | undefined
  private updateSubscription: Subscription | undefined;

  public img: string = '';
  public profileForm: FormGroupTypeSafe<IProfileForm>;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public optPersonTypes: SelectItem<PersonTypeResult>[] = [];
  public user: AuthenticatedUserModel | undefined;

  public documentMask: string = '';
  public document: string = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly viaCepService: ViaCepService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService
  ) {
    this.profileForm = this.fb.group<IProfileForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      personTypeId: new FormControl([Validators.required]),
      document: new FormControl([Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
    });
  }

  get pf() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.getAuthenticatedUser()
      .subscribe((data: AuthenticatedUserModel) => {
        this.img = data.img;
      });
    this.forkSubscription = this.getDataFromAPI();
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.forkSubscription) {
      this.forkSubscription.unsubscribe();
    }
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private getDataFromAPI(): Subscription {
    this.isLoading = true;
    return forkJoin({
      personTypes: this.configService.getPersonTypes(),
      user: this.authService.getUser(),
    }).subscribe((res) => {
      if (res) {
        this.optPersonTypes = this.getOptPersonTypes(res.personTypes);
        this.setProfile(res.user.data);
      }
      this.isLoading = false;
    }, (error) => {
      this.isLoading = false;
    });
  }

  private getOptPersonTypes(personTypes: PersonTypeResult[]): SelectItem<PersonTypeResult>[] {
    return personTypes.map((personType: PersonTypeResult) => {
      return {
        label: personType.description,
        value: personType
      }
    })
  }

  private setProfile(user: AuthenticatedUserModel): void {
    this.pf.email.setValue(user.email);
    this.pf.username.setValue(user.username);
    this.pf.personTypeId.setValue(user.personTypeId);
    this.changePersonType(user.personTypeId ?? '');
    this.pf.document.setValue(user.document);
    this.pf.zipCode.setValue(user.zipCode);
    this.pf.address.setValue(user.address);
    this.pf.district.setValue(user.district);
    this.pf.complement.setValue(user.complement);
    this.pf.city.setValue(user.city);
    this.pf.state.setValue(user.state);
  }

  public getAddress(zipCodeInput: string): void {
    const zipCode = zipCodeInput
      .replace('.', '')
      .replace('-', '');

    if (zipCode.length === 8) {
      this.addressSubscription = this.viaCepService.getAddress({
        zipCode
      }).subscribe((data: AddressResult) => {
        if (data) {
          this.pf.zipCode.setValue(data.cep);
          this.pf.address.setValue(data.logradouro);
          this.pf.district.setValue(data.bairro);
          this.pf.complement.setValue(data.complemento);
          this.pf.city.setValue(data.localidade);
          this.pf.state.setValue(data.uf);
        }
      });
    }
  }

  public changePersonType(selectItemValue: string): void {
    this.optPersonTypes.forEach((opt: SelectItem<PersonTypeResult>) => {
      if (opt.value.id === selectItemValue) {
        this.documentMask = opt.value.documentMask ?? '';
        this.document = opt.value.document ?? '';
      }
    });
  }

  public tryUpdate(): void {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.updateSubscription = this.updateProfile(
      this.profileForm.value
    );
  }

  private updateProfile({
                          username,
                          personTypeId,
                          document,
                          zipCode,
                          address,
                          district,
                          city,
                          state,
                          complement
                        }: IProfileForm): Subscription {
    this.isLoading = true;
    return this.authService.updateUser({
      username,
      personTypeId,
      document,
      zipCode,
      address,
      district,
      city,
      state,
      complement
    }).subscribe((data: UpdateUserResult) => {
      if (data) {
        this.isLoading = false;
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Seu perfil foi atualizado :)'});
      }
    }, (error) => {
      this.isLoading = false;
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ops, algo deu errado :('});
    });
  }
}
