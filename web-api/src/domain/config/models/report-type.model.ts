import {Document} from 'mongoose';

export interface ReportType extends Document {
    description: string;
}
