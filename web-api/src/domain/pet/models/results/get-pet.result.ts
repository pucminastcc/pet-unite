import {Types} from 'mongoose';

export interface GetPetResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    petGenderId: Types.ObjectId;
    breed: string;
    description: string;
}
