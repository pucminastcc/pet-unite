import {Document} from 'mongoose';

export interface PasswordResetCode extends Document {
    email: string;
    code: string;
    createdAt: Date;
}

export interface PasswordResetCodeModel {
    email: string;
    code: string;
}
