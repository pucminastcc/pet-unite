import {Document, Types} from 'mongoose';

export interface Account extends Document {
    token: string;
    userId: Types.ObjectId;
    createdAt: Date;
}
