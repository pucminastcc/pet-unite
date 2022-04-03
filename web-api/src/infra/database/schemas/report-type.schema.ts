import * as mongoose from 'mongoose';

export const ReportTypeSchema = new mongoose.Schema({
    description: {type: String, required: true},
}, {timestamps: false, collection: 'reportTypes'});
