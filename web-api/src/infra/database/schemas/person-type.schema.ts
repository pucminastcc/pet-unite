import * as mongoose from 'mongoose';

export const PersonTypeSchema = new mongoose.Schema({
    description: {type: String},
    document: {type: String},
    documentMask: {type: String},
}, {timestamps: false, collection: 'personTypes'});
