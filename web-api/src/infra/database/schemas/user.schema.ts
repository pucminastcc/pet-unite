import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String},
    password: {type: String},
    terms: {type: Boolean, default: true},
    activated: {type: Boolean, default: false},
    provider: {type: String, default: 'application'},
}, {timestamps: true, collection: 'users'});
