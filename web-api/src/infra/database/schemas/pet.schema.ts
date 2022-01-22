import * as mongoose from 'mongoose';
import {Types} from 'mongoose';

export const PetSchema = new mongoose.Schema({
    img: {type: String},
    name: {type: String},
    description: {type: String},
    userId: {type: Types.ObjectId, required: true}
}, {timestamps: true, collection: 'pets'});
