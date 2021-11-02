import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    token: {type: String, required: true},
    userId: {type: Types.ObjectId, required: true},
    createdAt: {type: Date, expires: '25m', default: Date.now},
}, {timestamps: true, collection: 'accounts'});
