import {Document} from 'mongoose';

export interface BrazilState extends Document {
    description: string;
    initials: string;
}
