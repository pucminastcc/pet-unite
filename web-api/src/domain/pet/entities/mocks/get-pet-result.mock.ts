import {Types} from 'mongoose';

export class GetPetResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    petGenderId: Types.ObjectId;
    petTypeId: Types.ObjectId;
    breed: string;
    description: string;
    rateLikesChild: number;
    rateLikesTours: number;
    rateFriendly: number;
    rateTraining: number;
    age: string;

    constructor(id?: Types.ObjectId, img?: string, name?: string, petGenderId?: Types.ObjectId, petTypeId?: Types.ObjectId,
                breed?: string, description?: string, rateLikesChild?: number, rateLikesTours?: number, rateFriendly?: number,
                rateTraining?: number, age?: string) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.petGenderId = petGenderId;
        this.petTypeId = petTypeId;
        this.breed = breed;
        this.description = description;
        this.rateLikesChild = rateLikesChild;
        this.rateLikesTours = rateLikesTours;
        this.rateFriendly = rateFriendly;
        this.rateTraining = rateTraining;
        this.age = age;
    }
}
