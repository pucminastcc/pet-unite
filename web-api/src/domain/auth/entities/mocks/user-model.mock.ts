export class UserModel {
    id?: string;
    username: string;
    email: string;
    provider: string;
    img?: string;
    isSuperUser: boolean;
    isInstitution: boolean;
    personTypeId?: string;
    document?: string;
    zipCode?: string;
    address?: string;
    district?: string;
    cityId?: string;
    state?: string;
    complement?: string;
    phone?: string;
    cell?: string;
    whatsapp?: string;

    constructor(id?: string, username?: string, email?: string, provider?: string, img?: string, isSuperUser?: boolean, isInstitution?: boolean,
                personTypeId?: string, document?: string, zipCode?: string, address?: string, district?: string, cityId?: string, state?: string,
                complement?: string, phone?: string, cell?: string, whatsapp?: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.provider = provider;
        this.img = img;
        this.isSuperUser = isSuperUser;
        this.isInstitution = isInstitution;
        this.personTypeId = personTypeId;
        this.document = document;
        this.zipCode = zipCode;
        this.address = address;
        this.district = district;
        this.cityId = cityId;
        this.state = state;
        this.complement = complement;
        this.phone = phone;
        this.cell = cell;
        this.whatsapp = whatsapp;
    }
}
