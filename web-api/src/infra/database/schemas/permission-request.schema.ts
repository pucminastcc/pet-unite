import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const PermissionRequestSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, required: true},
    email: {type: String, required: true},
    date: {type: String, required: true},
}, {timestamps: true, collection: 'permissionRequests'});
