import {Document, Types} from 'mongoose';

export interface Donation extends Document {
    userId: Types.ObjectId;
    username: string;
    petId: Types.ObjectId;
    petTypeId: Types.ObjectId;
    petGenderId: Types.ObjectId;
    state: string;
    city: string;
    lng: string;
    lat: string;
    contacts: Contacts[];
    interestedUserId: Types.ObjectId;
    interestedUsername: string;
    interestedUserFlagged: boolean;
    status: string;
    statusSeverity: string;
    rating: number;
    feedback: string;
    date: string;
    signalDate: string;
    donated: boolean;
    donatedToInstitution: boolean;
}

export interface Contacts {
    description: string;
    value: string;
}
