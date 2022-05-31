import * as mongoose from 'mongoose';

export const PetGenderSchema = new mongoose.Schema({
    description: {type: String},
}, {timestamps: false, collection: 'petGenders'});
