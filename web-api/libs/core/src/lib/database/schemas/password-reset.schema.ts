import * as mongoose from 'mongoose';

export const PasswordResetSchema = new mongoose.Schema({
    email: {type: String},
    code: {type: String},
    createdAt: {type: Date, expires: '15m', default: Date.now}
}, {timestamps: true, collection: 'passwordReset'});
