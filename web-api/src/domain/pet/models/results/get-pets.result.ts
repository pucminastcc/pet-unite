import {Types} from 'mongoose';

export interface GetPetsResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    inDonation: boolean;
    userId?: Types.ObjectId;
}
