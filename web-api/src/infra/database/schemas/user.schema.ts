import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    terms: {type: Boolean, default: true},
    activated: {type: Boolean, default: false},
    provider: {type: String, default: 'application'},
    img: {type: String, default: ''},
}, {timestamps: true, collection: 'users'});
