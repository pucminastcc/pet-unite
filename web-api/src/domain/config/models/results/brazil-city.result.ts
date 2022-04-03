import {Types} from 'mongoose';

export interface BrazilCityResult {
    id: Types.ObjectId;
    cityId: number;
    state: string;
    description: string;
    lng: number;
    lat: number;
}
