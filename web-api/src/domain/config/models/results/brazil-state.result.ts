import {Types} from 'mongoose';

export interface BrazilStateResult{
    id: Types.ObjectId;
    description: string;
    initials: string;
}
