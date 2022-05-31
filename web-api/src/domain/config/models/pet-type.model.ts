import {Document} from 'mongoose';

export interface PetType extends Document {
    description: string;
}
