import {Types} from 'mongoose';

export class BrazilCityResult {
    id: Types.ObjectId;
    cityId: number;
    state: string;
    description: string;
    lng: number;
    lat: number;

    constructor(id?: Types.ObjectId, cityId?: number, state?: string, description?: string, lng?: number, lat?: number) {
        this.id = id;
        this.cityId = cityId;
        this.state = state;
        this.description = description;
        this.lng = lng;
        this.lat = lat;
    }
}
