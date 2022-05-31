import {Types} from 'mongoose';

export class PersonTypeResult {
    id: Types.ObjectId;
    description: string;
    document: string;
    documentMask: string;

    constructor(id?: Types.ObjectId, description?: string, document?: string, documentMask?: string) {
        this.id = id;
        this.description = description;
        this.document = document;
        this.documentMask = documentMask;
    }
}
