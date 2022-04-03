import {Document} from 'mongoose';

export interface BrazilCity extends Document {
    cityId: number;
    state: string;
    description: string;
    lng: number;
    lat: number;
}
