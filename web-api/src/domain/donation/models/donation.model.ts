import {Document, Types} from 'mongoose';

export interface Donation extends Document {
    userId: Types.ObjectId;
    username: string;
    petId: Types.ObjectId;
    petImg: string;
    petName: string;
    petGenderId: Types.ObjectId;
    state: string;
    city: string;
    lng: string;
    lat: string;
    contacts: Contacts[];
    interestedUserId: Types.ObjectId;
    interestedUsername: string;
    interestedUserFlagged: boolean;
    userFlagged: boolean;
    status: string;
}

export interface Contacts {
    description: string;
    value: string;
}
