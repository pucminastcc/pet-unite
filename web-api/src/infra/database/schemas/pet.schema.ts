import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const PetSchema = new mongoose.Schema({
    img: {type: String},
    name: {type: String},
    petGenderId: {type: Types.ObjectId, required: true},
    breed: {type: String},
    description: {type: String},
    userId: {type: Types.ObjectId, required: true},
    inDonation: {type: Boolean, default: false}
}, {timestamps: true, collection: 'pets'});
