import {Types} from 'mongoose';

export interface GetPetResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    petGenderId: Types.ObjectId;
    petTypeId: Types.ObjectId;
    breed: string;
    description: string;
    rateLikesChild: number;
    rateLikesTours: number;
    rateFriendly: number;
    rateTraining: number;
    age: string;
}
