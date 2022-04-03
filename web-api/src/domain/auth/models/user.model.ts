import {Document} from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    terms: boolean;
    provider: string;
    activated: boolean;
    img: string;
    personTypeId: string;
    document: string;
    zipCode: string;
    address: string;
    district: string;
    cityId: string;
    state: string;
    complement: string;
    phone: string;
    cell: string;
    whatsapp: string;
    isSuperUser: boolean;
    blocked: boolean;
    deleted: boolean;
}

export interface UserModel {
    id?: string;
    username: string;
    email: string;
    provider: string;
    img?: string;
    isSuperUser: boolean;
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
}
