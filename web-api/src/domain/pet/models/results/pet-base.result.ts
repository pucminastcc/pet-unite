import {Types} from 'mongoose';

export interface PetBaseResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    userId?: Types.ObjectId;
    inDonation: boolean;
    isDonated: boolean;
    donationId?: Types.ObjectId;
}
