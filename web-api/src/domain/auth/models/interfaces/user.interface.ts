import {Document} from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    terms: boolean;
    activated: boolean;
    img: string;
    personTypeId: string;
    document: string;
    zipCode: string;
    address: string;
    district: string;
    city: string;
    state: string;
    complement: string;
}
