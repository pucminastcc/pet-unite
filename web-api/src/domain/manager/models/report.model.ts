import {Document, Types} from 'mongoose';

export interface Report extends Document {
    userId: Types.ObjectId;
    username: string;
    email: string;
    reportTypeId: Types.ObjectId;
    subject: string;
    description: string;
    date: string;
}
