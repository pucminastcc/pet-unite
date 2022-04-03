import {Document, Types} from 'mongoose';

export interface Pet extends Document {
    img: string;
    name: string;
    petGenderId: Types.ObjectId;
    breed: string;
    description: string;
    userId: Types.ObjectId;
    inDonation: boolean;
    donationId: Types.ObjectId;
}
