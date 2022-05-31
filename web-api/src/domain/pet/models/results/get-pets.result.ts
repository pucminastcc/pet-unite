import {Types} from 'mongoose';

export interface GetPetsResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    userId?: Types.ObjectId;
    inDonation: boolean;
    isDonated: boolean;
    donationId?: Types.ObjectId;
}
