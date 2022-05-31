import {Document, Types} from 'mongoose';

export interface Pet extends Document {
    img: string;
    name: string;
    petGenderId: Types.ObjectId;
    petTypeId: Types.ObjectId;
    breed: string;
    description: string;
    userId: Types.ObjectId;
    inDonation: boolean;
    isDonated: boolean;
    donationId: Types.ObjectId;
    rateLikesChild: number;
    rateLikesTours: number;
    rateFriendly: number;
    rateTraining: number;
    age: string;
}
