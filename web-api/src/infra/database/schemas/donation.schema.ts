import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const DonationSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, required: true},
    username: {type: String, required: true},
    petId: {type: Types.ObjectId, required: true},
    petImg: {type: String, required: true},
    petName: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    lng: {type: Number, required: true},
    lat: {type: Number, required: true},
    contacts: {type: Array, required: true},
    interestedUserId: {type: Types.ObjectId},
    interestedUsername: {type: String},
    interestedUserFlagged: {type: Boolean},
    userFlagged: {type: Boolean},
    status: {type: String, default: 'AGUARDANDO SINZALIZAÇÃO'},
}, {timestamps: true, collection: 'donations'});

