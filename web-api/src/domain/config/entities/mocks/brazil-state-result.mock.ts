import {Types} from 'mongoose';

export class BrazilStateResult{
    id: Types.ObjectId;
    description: string;
    initials: string;

    constructor(id?: Types.ObjectId, description?: string, initials?: string) {
        this.id = id;
        this.description = description;
        this.initials = initials;
    }
}
