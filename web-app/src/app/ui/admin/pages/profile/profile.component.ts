import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilderTypeSafe, FormGroupTypeSafe} from 'angular-typesafe-reactive-forms-helper';
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
import {LogoutResult} from '../../../../domain/auth/models/results/logout.result';
import {StateResult} from '../../../../domain/shared/services/models/results/state.result';
import {IProfileForm} from '../../../../domain/profile/models/forms/iprofile.form';
import {CityResult} from '../../../../domain/shared/services/models/results/city.result';
import {finalize} from 'rxjs/operators';
import {LocalService} from '../../../shared/services/local.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;
  private forkSubscription: Subscription | undefined;
  private addressSubscription: Subscription | undefined
  private updateSubscription: Subscription | undefined;

  private cities: CityResult[] = [];
  public img: string | ArrayBuffer | null = '';
  public profileForm: FormGroupTypeSafe<IProfileForm>;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public optPersonTypes: SelectItem<PersonTypeResult>[] = [];
  public optStates: SelectItem<StateResult>[] = [];
  public optCities: SelectItem<CityResult>[] = [];
  public user: AuthenticatedUserModel | undefined;

  public documentMask: string = '';
  public document: string = '';
  public invalidDocument: boolean = false;
  public activeIndex: number = 0;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly localService: LocalService,
    private readonly viaCepService: ViaCepService,
    private readonly fb: FormBuilderTypeSafe,
    private readonly messageService: MessageService
  ) {
    this.profileForm = this.fb.group<IProfileForm>({
      img: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      provider: new FormControl('', [Validators.required]),
      personTypeId: new FormControl([Validators.required]),
      document: new FormControl(''),
      permissionRequest: new FormControl(false),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      cityId: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      complement: new FormControl(''),
      phone: new FormControl(''),
      cell: new FormControl(''),
      whatsapp: new FormControl(''),
    });

    this.getAuthenticatedUser();
  }

  private getAuthenticatedUser(): void {
    this.authSubscription = this.authService.getAuthenticatedUser()
      .subscribe((user: AuthenticatedUserModel) => {
        if (user) {
          this.user = user;
        }
      });
  }

  get pf() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.forkSubscription = this.getConfigData();
  }

  ngOnDestroy(): void {
    this.cities = [];
    this.unSubscribe();
  }

  private unSubscribe(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
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

  private getConfigData(): Subscription {
    this.isLoading = true;
    return forkJoin({
      personTypes: this.configService.getPersonTypes(),
      states: this.configService.getStates(),
      cities: this.configService.getCities(),
      user: this.authService.getUser(),
    })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.optPersonTypes = this.getOptPersonTypes(res.personTypes);
          this.optStates = this.getOptStates(res.states);
          this.cities = res.cities;
          this.setProfile(res.user.data);
        }
      }, (error) => {
        if (error.status === 401) {
          this.logout();
        }
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

  private getOptStates(states: StateResult[]): SelectItem<StateResult>[] {
    return states.map((state: StateResult) => {
      return {
        label: state.initials,
        value: state
      }
    })
  }

  private getOptCities(cities: CityResult[], state: string): SelectItem<CityResult>[] {
    return cities.filter(e => e.state === state).map((city: CityResult) => {
      return {
        label: city.description,
        value: city
      }
    })
  }

  public onChangeState(state: string): void {
    this.pf.cityId.setValue(null);
    this.optCities = this.getOptCities(this.cities, state);
  }

  private setProfile(user: AuthenticatedUserModel): void {
    this.img = user.img;
    this.pf.img.setValue(user.img);
    this.pf.email.setValue(user.email);
    this.pf.username.setValue(user.username);
    this.pf.provider.setValue(user.provider.toUpperCase());
    this.pf.personTypeId.setValue(user.personTypeId);
    this.changePersonType(user.personTypeId ?? '');
    this.pf.document.setValue(user.document);
    this.pf.zipCode.setValue(user.zipCode);
    this.pf.address.setValue(user.address);
    this.pf.district.setValue(user.district);
    this.pf.complement.setValue(user.complement);
    this.pf.cityId.setValue(user.cityId);
    this.pf.state.setValue(user.state);
    if (user.state) {
      this.optCities = this.getOptCities(this.cities, user.state);
    }
    this.pf.phone.setValue(user.phone);
    this.pf.cell.setValue(user.cell);
    this.pf.whatsapp.setValue(user.whatsapp);
  }

  public getAddress(zipCodeInput: string): void {
    const zipCode = zipCodeInput
      .replace('.', '')
      .replace('-', '');

    if (zipCode.length === 8) {
      this.addressSubscription = this.viaCepService.getAddress({
        zipCode
      }).subscribe(async (data: AddressResult) => {
        if (data) {
          this.pf.zipCode.setValue(data.cep);
          this.pf.address.setValue(data.logradouro);
          this.pf.district.setValue(data.bairro);
          this.pf.complement.setValue(data.complemento);
          this.pf.state.setValue(data.uf);
          this.onChangeState(data.uf);
          let city = this.optCities.filter(e => e.label?.toUpperCase() === data.localidade.toUpperCase());
          if (city) {
            const id = city.map(e => e.value.id).find(e => true);
            this.pf.cityId.setValue(id);
          }
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

  public onSelectFile(event: any): void {
    const file = event.currentFiles[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img = reader.result;
        this.pf.img.setValue(this.img);
      };
      reader.onerror = function (error: ProgressEvent<FileReader>) {
      };
    }
  }

  public clear(input: any) {
    input.clear();
    this.img = '';
  }

  public tryUpdate(): void {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    const {phone, cell, whatsapp} = this.profileForm.value;

    if (!phone && !cell && !whatsapp) {
      this.activeIndex = 1;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Informe pelo menos uma forma de contato!'
      });
      return;
    }

    const {document} = this.profileForm.value;
    if (document && document.length > 0) {
      if (this.document === 'CPF') {
        if (!this.isValidDocument(document)) {
          this.activeIndex = 0;
          this.pf.document.setValue('');
          this.invalidDocument = true;
          return;
        } else {
          this.invalidDocument = false;
        }
      }
    }

    this.updateSubscription = this.updateProfile(
      this.profileForm.value
    );
  }

  private isValidDocument(document: string): boolean {
    let sum = 0;
    document = document
      .split('.').join('')
      .replace('-', '')
      .replace('/', '');

    if (document === '00000000000' || document === '11111111111' || document === '22222222222' || document === '33333333333' ||
      document === '44444444444' || document === '55555555555' || document === '66666666666' || document === '77777777777' || document === '88888888888' ||
      document === '99999999999' || document.length !== 11) {
      this.invalidDocument = true;
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(document.substring(i - 1, i)) * (11 - i);
    }

    let module = (sum * 10) % 11;
    if ((module === 10) || (module === 11)) {
      module = 0;
    }

    if (module !== parseInt(document.substring(9, 10))) {
      this.invalidDocument = true;
      return false;
    }

    sum = 0;
    for (let k = 1; k <= 10; k++) {
      sum = sum + parseInt(document.substring(k - 1, k)) * (12 - k)
    }

    module = (sum * 10) % 11;
    if ((module === 10) || (module === 11)) {
      module = 0;
    }

    if (module !== parseInt(document.substring(10, 11))) {
      this.invalidDocument = true;
      return false;
    }
    return true;
  }

  private updateProfile(profileForm: IProfileForm): Subscription {
    const {
      username, personTypeId, document, zipCode, address, district, cityId, state, complement, phone, cell, whatsapp,
      img, permissionRequest
    } = profileForm;
    this.isLoading = true;
    return this.authService.updateUser({
      username, personTypeId, document, zipCode, address, district, cityId, state, complement, phone, cell, whatsapp,
      img, permissionRequest
    }).pipe(
      finalize(() => {
        this.isLoading = false;
        this.invalidDocument = false;
      }))
      .subscribe((data: UpdateUserResult) => {
        if (data) {
          this.localService.setJsonValue('auth', JSON.stringify(data.auth));
          this.messageService.add({
            severity: data.success ? 'success' : 'error',
            summary: data.success ? 'Sucesso' : 'Erro',
            detail: data.message
          });
          this.getAuthenticatedUser();
          this.pf.permissionRequest.reset();
        }
      }, (error) => {
        error.status === 401 ?
          this.logout() :
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ops, algo deu errado :('
          });
      });
  }

  public logout(): void {
    this.authService.logout()
      .subscribe((data: LogoutResult) => {
        if (data) {
          if (data.success) {
            window.location.href = '/';
          }
        }
      });
  }
}
