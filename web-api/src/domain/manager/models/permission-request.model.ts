import {Document, Types} from 'mongoose';

export interface PermissionRequest extends Document {
    userId: Types.ObjectId;
    email: string;
    date: string;
}
