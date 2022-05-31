import * as mongoose from 'mongoose';

export const PetTypeSchema = new mongoose.Schema({
    description: {type: String},
}, {timestamps: false, collection: 'petTypes'});
