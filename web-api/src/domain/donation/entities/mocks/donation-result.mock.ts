import {Types} from 'mongoose';
import {Contacts} from '../../models/donation.model';

export class DonationResult {
    id: string;
    userId: Types.ObjectId;
    username: string;
    userImg?: string;
    userIsInstitution?: boolean;
    petId: Types.ObjectId;
    petName: string;
    petImg: string;
    petDescription?: string;
    petGenderId: Types.ObjectId;
    petGender: string;
    petTypeId: Types.ObjectId;
    petType: string;
    petBreed: string;
    petAge: string;
    rateTraining: number;
    rateFriendly: number;
    rateLikesTours: number;
    rateLikesChild: number;
    state: string;
    city: string;
    lng: number;
    lat: number;
    date: string;
    contacts?: Contacts[];
    interestedUserId?: Types.ObjectId;
    interestedUsername?: string;
    interestedUserFlagged?: boolean;
    interestedUserImg?: string;
    status?: string;
    statusSeverity?: string;
    rating?: number;
    feedback?: string;
    donated: boolean;
    signalDate: string;
    donatedToInstitution: boolean;

    constructor(id: string, userId: Types.ObjectId, username: string, userImg: string, userIsInstitution: boolean,
                petId: Types.ObjectId, petName: string, petImg: string, petDescription: string, petGenderId: Types.ObjectId,
                petGender: string, petTypeId: Types.ObjectId, petType: string, petBreed: string, petAge: string,
                rateTraining: number, rateFriendly: number, rateLikesTours: number, rateLikesChild: number, state: string,
                city: string, lng: number, lat: number, date: string, contacts: Contacts[], interestedUserId: Types.ObjectId,
                interestedUsername: string, interestedUserFlagged: boolean, interestedUserImg: string, status: string,
                statusSeverity: string, rating: number, feedback: string, donated: boolean, signalDate: string,
                donatedToInstitution: boolean) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.userImg = userImg;
        this.userIsInstitution = userIsInstitution;
        this.petId = petId;
        this.petName = petName;
        this.petImg = petImg;
        this.petDescription = petDescription;
        this.petGenderId = petGenderId;
        this.petGender = petGender;
        this.petTypeId = petTypeId;
        this.petType = petType;
        this.petBreed = petBreed;
        this.petAge = petAge;
        this.rateTraining = rateTraining;
        this.rateFriendly = rateFriendly;
        this.rateLikesTours = rateLikesTours;
        this.rateLikesChild = rateLikesChild;
        this.state = state;
        this.city = city;
        this.lng = lng;
        this.lat = lat;
        this.date = date;
        this.contacts = contacts;
        this.interestedUserId = interestedUserId;
        this.interestedUsername = interestedUsername;
        this.interestedUserFlagged = interestedUserFlagged;
        this.interestedUserImg = interestedUserImg;
        this.status = status;
        this.statusSeverity = statusSeverity;
        this.rating = rating;
        this.feedback = feedback;
        this.donated = donated;
        this.signalDate = signalDate;
        this.donatedToInstitution = donatedToInstitution;
    }
}
