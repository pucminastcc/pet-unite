import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
    description: {type: String},
}, {timestamps: false, collection: 'roles'});
