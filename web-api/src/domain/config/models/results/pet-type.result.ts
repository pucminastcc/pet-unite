import {Types} from 'mongoose';

export interface PetTypeResult {
    id: Types.ObjectId;
    description: string;
}
