import {Types} from 'mongoose';

export class PetGenderResult {
    id: Types.ObjectId;
    description: string;

    constructor(id?: Types.ObjectId, description?: string) {
        this.id = id;
        this.description = description;
    }
}
