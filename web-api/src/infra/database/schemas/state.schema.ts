import * as mongoose from 'mongoose';

export const BrazilStateSchema = new mongoose.Schema({
    description: {type: String},
    initials: {type: String},
}, {timestamps: false, collection: 'states'});
