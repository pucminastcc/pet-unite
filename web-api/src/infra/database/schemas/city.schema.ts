import * as mongoose from 'mongoose';

export const BrazilCitySchema = new mongoose.Schema({
    cityId: {type: Number},
    state: {type: String},
    description: {type: String},
    lng: {type: Number},
    lat: {type: Number},
}, {timestamps: false, collection: 'cities'});
