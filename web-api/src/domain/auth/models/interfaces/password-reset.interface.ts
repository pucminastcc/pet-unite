import {Document} from 'mongoose';

export interface PasswordReset extends Document {
    email: string;
    code: string;
    createdAt: Date;
}
