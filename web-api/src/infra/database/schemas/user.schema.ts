import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    terms: {type: Boolean, default: true},
    activated: {type: Boolean, default: false},
    provider: {type: String, default: 'application'},
    img: {type: String, default: ''},
    personTypeId: {type: Types.ObjectId, default: new Types.ObjectId('61edc763ba146329a791e7a3')},
    document: {type: String},
    zipCode: {type: String},
    address: {type: String},
    district: {type: String},
    cityId: {type: Types.ObjectId},
    state: {type: String},
    complement: {type: String},
    phone: {type: String},
    cell: {type: String},
    whatsapp: {type: String},
    isSuperUser: {type: Boolean, default: false},
    isInstitution: {type: Boolean, default: false},
    blocked: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false},
}, {timestamps: true, collection: 'users'});
