import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const ReportSchema = new mongoose.Schema({
    userId: {type: Types.ObjectId, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    reportTypeId: {type: Types.ObjectId, required: true},
    subject: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true}
}, {timestamps: true, collection: 'reports'});
