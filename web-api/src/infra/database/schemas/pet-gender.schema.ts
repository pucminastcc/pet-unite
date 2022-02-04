import * as mongoose from 'mongoose';

export const PetGendersSchema = new mongoose.Schema({
    description: {type: String},
}, {timestamps: false, collection: 'petGenders'});
