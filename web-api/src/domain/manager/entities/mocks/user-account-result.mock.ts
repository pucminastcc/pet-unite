export class UserAccountResult {
    username: string;
    email: string;
    terms: boolean;
    provider: string;
    activated: boolean;
    img: string;
    personType: string;
    document: string;
    zipCode: string;
    address: string;
    district: string;
    city: string;
    state: string;
    complement: string;
    phone: string;
    cell: string;
    whatsapp: string;
    isSuperUser: boolean;
    isInstitution: boolean;
    blocked: boolean;
    lng: number;
    lat: number;

    constructor(username: string, email: string, terms: boolean, provider: string, activated: boolean, img: string,
                personType: string, document: string, zipCode: string, address: string, district: string, city: string,
                state: string, complement: string, phone: string, cell: string, whatsapp: string, isSuperUser: boolean,
                isInstitution: boolean, blocked: boolean, lng: number, lat: number) {
        this.username = username;
        this.email = email;
        this.terms = terms;
        this.provider = provider;
        this.activated = activated;
        this.img = img;
        this.personType = personType;
        this.document = document;
        this.zipCode = zipCode;
        this.address = address;
        this.district = district;
        this.city = city;
        this.state = state;
        this.complement = complement;
        this.phone = phone;
        this.cell = cell;
        this.whatsapp = whatsapp;
        this.isSuperUser = isSuperUser;
        this.isInstitution = isInstitution;
        this.blocked = blocked;
        this.lng = lng;
        this.lat = lat;
    }
}
