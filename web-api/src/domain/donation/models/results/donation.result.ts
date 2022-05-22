import {Types} from 'mongoose';
import {Contacts} from '../donation.model';

export interface DonationResult {
    id: string;
    userId: Types.ObjectId;
    username: string;
    petId: Types.ObjectId;
    petName: string;
    petImg: string;
    petGenderId: Types.ObjectId;
    state: string;
    city: string;
    lng: string;
    lat: string;
    contacts: Contacts[];
    interestedUserId: Types.ObjectId;
    interestedUsername: string;
    interestedUserFlagged: boolean;
}
