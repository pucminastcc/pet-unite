import * as mongoose from 'mongoose';

export const PasswordResetCodeSchema = new mongoose.Schema({
    email: {type: String},
    code: {type: String},
    createdAt: {type: Date, expires: '15m', default: Date.now},
}, {timestamps: true, collection: 'passwordResetCodes'});
