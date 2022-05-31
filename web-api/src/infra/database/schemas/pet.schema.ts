import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const PetSchema = new mongoose.Schema({
    img: {type: String},
    name: {type: String},
    petGenderId: {type: Types.ObjectId, required: true},
    petTypeId: {type: Types.ObjectId, required: true},
    breed: {type: String},
    description: {type: String},
    userId: {type: Types.ObjectId, required: true},
    inDonation: {type: Boolean, default: false},
    isDonated: {type: Boolean, default: false},
    donationId: {type: Types.ObjectId},
    rateLikesChild: {type: Number, default: 0},
    rateLikesTours: {type: Number, default: 0},
    rateFriendly: {type: Number, default: 0},
    rateTraining: {type: Number, default: 0},
    age: {type: String, default: ''},
}, {timestamps: true, collection: 'pets'});
