import {Types} from 'mongoose';

export interface PersonTypeResult {
    id: Types.ObjectId;
    description: string;
    document: string;
    documentMask: string;
}
