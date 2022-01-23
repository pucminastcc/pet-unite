import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    terms: {type: Boolean, default: true},
    activated: {type: Boolean, default: false},
    provider: {type: String, default: 'application'},
    img: {type: String, default: ''},
    personTypeId: {type: Types.ObjectId, default: new Types.ObjectId('61edc763ba146329a791e7a3')},
    document: {type: String, default: ''},
    zipCode: {type: String, default: ''},
    address: {type: String, default: ''},
    district: {type: String, default: ''},
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    complement: {type: String, default: ''},
}, {timestamps: true, collection: 'users'});
