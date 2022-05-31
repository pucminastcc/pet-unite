import {Types} from 'mongoose';

export class PetTypesResult {
    id: Types.ObjectId;
    description: string;

    constructor(id?: Types.ObjectId, description?: string) {
        this.id = id;
        this.description = description;
    }
}
