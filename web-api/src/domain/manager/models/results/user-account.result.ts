export interface UserAccountResult {
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
}
