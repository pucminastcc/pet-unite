import {Types} from 'mongoose';

export class PetBaseResult {
    id: Types.ObjectId;
    img: string;
    name: string;
    userId?: Types.ObjectId;
    inDonation: boolean;
    isDonated: boolean;
    donationId?: Types.ObjectId;

    constructor(id?: Types.ObjectId, img?: string, name?: string, userId?: Types.ObjectId, inDonation?: boolean,
                isDonated?: boolean, donationId?: Types.ObjectId) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.userId = userId;
        this.inDonation = inDonation;
        this.isDonated = isDonated;
        this.donationId = donationId;
    }
}
