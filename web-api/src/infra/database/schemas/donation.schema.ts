import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const DonationSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, required: true},
    username: {type: String, required: true},
    petId: {type: Types.ObjectId, required: true},
    petGenderId: {type: Types.ObjectId, required: true},
    petTypeId: {type: Types.ObjectId, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    lng: {type: Number, required: true},
    lat: {type: Number, required: true},
    contacts: {type: Array, required: true},
    interestedUserId: {type: Types.ObjectId},
    interestedUsername: {type: String},
    interestedUserFlagged: {type: Boolean},
    status: {type: String, default: ''},
    statusSeverity: {type: String, default: ''},
    rating: {type: Number, default: 0},
    feedback: {type: String, default: ''},
    date: {type: String, required: true},
    signalDate: {type: String},
    donated: {type: Boolean, default: false},
    donatedToInstitution: {type: Boolean, default: false},
}, {timestamps: true, collection: 'donations'});

