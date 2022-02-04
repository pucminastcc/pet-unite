import {Document} from 'mongoose';

export interface PersonType extends Document {
    description: string;
    document: string;
    documentMask: string;
}

