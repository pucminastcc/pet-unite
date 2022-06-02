import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Contacts, Donation} from '../../../domain/donation/models/donation.model';
import {Injectable} from '@nestjs/common';
import {User} from '../../../domain/auth/models/user.model';
import {Pet} from '../../../domain/pet/models/pet.model';
import {DonationResult} from 'src/domain/donation/models/results/donation.result';
import {DonatePetMessage} from '../../../domain/donation/enums/donate-pet-message.enum';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {BrazilCity} from '../../../domain/config/models/brazil-city.model';
import {PetType} from '../../../domain/config/models/pet-type.model';
import {PetGender} from '../../../domain/config/models/pet-gender.model';
import {GetUserDonationsDto} from '../../../domain/donation/dtos/get-user-donations.dto';
import {GetThirdDonationsDto} from '../../../domain/donation/dtos/get-third-donations.dto';
import {SignalDonationDto} from '../../../domain/donation/dtos/signal-donation.dto';
import {DeleteDonationDto} from '../../../domain/donation/dtos/delete-donation.dto';
import {DeleteDonationResult} from '../../../domain/donation/models/results/delete-donation.result';
import {GetDonationDto} from '../../../domain/donation/dtos/get-donation.dto';
import {SignalDonationMessage} from '../../../domain/donation/enums/signal-donation-message.enum';
import {DeleteDonationMessage} from '../../../domain/donation/enums/delete-donation-message.enum';
import {GetFlaggedDonationsDto} from '../../../domain/donation/dtos/get-flagged-donations.dto';
import {UpdateDonationStatusDto} from '../../../domain/donation/dtos/update-donation-status.dto';
import {UpdateDonationStatusResult} from '../../../domain/donation/models/results/update-donation-status.result';
import {UpdateDonationStatusMessage} from '../../../domain/donation/enums/update-donation-status-message.enum';
import {DonatePetStatusSeverity} from '../../../domain/donation/enums/donate-pet-status-severity.enum';
import {DonatePetStatusMessage} from '../../../domain/donation/enums/donate-pet-status-message.enum';
import {MailService} from '../../../shared/mail/services/mail.service';

@Injectable()
export class DonationRepository extends IDonationRepository {
    constructor(
        @InjectModel('Donation') private readonly donationModel: Model<Donation>,
        @InjectModel('BrazilCity') private readonly cityModel: Model<BrazilCity>,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Pet') private readonly petModel: Model<Pet>,
        @InjectModel('PetType') private readonly petTypesModel: Model<PetType>,
        @InjectModel('PetGender') private readonly petGendersModel: Model<PetGender>,
        private readonly mailService: MailService,
    ) {
        super();
    }

    async donatePet(dto: DonatePetDto): Promise<DonatePetResult> {
        let result: DonatePetResult = {success: false, message: DonatePetMessage.Error};

        const {userId, petId, institutionId} = dto;

        const user = await this.userModel.findById(userId).exec();
        const pet = await this.petModel.findById(petId).exec();

        if (user && pet) {

            if (!user.isInstitution) {
                const flaggedDonations = await this.donationModel.find({
                    interestedUserId: user.id, donated: false
                }).exec();

                if (flaggedDonations.length > 0) {
                    result = {success: false, message: DonatePetMessage.HasFlaggedDonations};
                    return result;
                }
            }

            let contacts: Contacts[] = [];

            if (user.phone) contacts.push({description: 'Telefone', value: user.phone});
            if (user.cell) contacts.push({description: 'Celular', value: user.cell});
            if (user.whatsapp) contacts.push({description: 'Whatsapp', value: user.whatsapp});

            const city = await this.cityModel.findById(user.cityId).exec();

            const insertDoc = {
                userId: user.id,
                username: user.username,
                petId: pet.id,
                petGenderId: pet.petGenderId,
                petTypeId: pet.petTypeId,
                state: user.state,
                city: city.description,
                lng: city.lng,
                lat: city.lat,
                contacts: contacts,
                date: new Date().toLocaleDateString(),
            };

            if (institutionId) {
                const institution = await this.userModel.findById(institutionId).exec();

                insertDoc['interestedUserId'] = institution.id;
                insertDoc['interestedUsername'] = institution.username;
                insertDoc['interestedUserFlagged'] = true;
                insertDoc['signalDate'] = new Date().toLocaleDateString();
                insertDoc['status'] = `${DonatePetStatusMessage.DonatedForInstitution}`;
                insertDoc['statusSeverity'] = DonatePetStatusSeverity.Info;
                insertDoc['donatedToInstitution'] = true;

                this.mailService.sendSignalDonation(institution.email, user.username, pet.name, true);

            } else {
                insertDoc['status'] = `${DonatePetStatusMessage.Waiting}`;
                insertDoc['statusSeverity'] = DonatePetStatusSeverity.Info;

            }

            const insert = await this.donationModel.insertMany(insertDoc);

            if (insert) {
                const donation = insert.find(f => true);
                await this.petModel.findByIdAndUpdate(pet.id, {
                    donationId: donation.id,
                    inDonation: true,
                    isDonated: false
                });
            }
            result = {success: true, message: DonatePetMessage.Success};
        }

        return result;
    }

    async getThirdDonations(dto: GetThirdDonationsDto): Promise<DonationResult[]> {
        let result: DonationResult[] = [];
        const {petTypeId, petGenderId, state, currentDate, userId} = dto;

        let filter = {
            userId: {$ne: userId},
            interestedUserId: {$exists: false}
        };

        if (petTypeId) filter['petTypeId'] = petTypeId;
        if (petGenderId) filter['petGenderId'] = petGenderId;
        if (state) filter['state'] = state;
        if (currentDate) {
            const currentDate = new Date();

            let offsetDate = new Date();
            offsetDate.setDate(offsetDate.getDate() - 7);

            filter['createdAt'] = {
                $gte: offsetDate.toISOString(),
                $lt: currentDate.toISOString()
            }
        }

        const donations = await this.donationModel.find(filter).sort({createdAt: 'desc'}).exec();

        const petGenders = await this.petGendersModel.find().exec();
        const petTypes = await this.petTypesModel.find().exec();

        if (donations) {
            for (let donation of donations) {
                const pet = await this.petModel.findById(donation.petId).exec();

                result.push({
                    id: donation.id,
                    userId: donation.userId,
                    username: donation.username,
                    petId: pet.id,
                    petName: pet.name,
                    petImg: pet.img,
                    petGenderId: pet.petGenderId,
                    petGender: petGenders.find(f => f.id == pet.petGenderId).description,
                    petTypeId: pet.petTypeId,
                    petType: petTypes.find(f => f.id == pet.petTypeId).description,
                    petBreed: pet.breed,
                    petAge: pet.age,
                    rateTraining: pet.rateTraining,
                    rateFriendly: pet.rateFriendly,
                    rateLikesTours: pet.rateLikesTours,
                    rateLikesChild: pet.rateLikesChild,
                    state: donation.state,
                    city: donation.city,
                    lng: donation.lng,
                    lat: donation.lat,
                    date: donation.date,
                    donated: donation.donated,
                    signalDate: donation.signalDate,
                    donatedToInstitution: donation.donatedToInstitution
                });
            }
        }
        return result;
    }

    async getUserDonations(dto: GetUserDonationsDto): Promise<DonationResult[]> {
        let result: DonationResult[] = [];
        const {userId} = dto;

        const donations = await this.donationModel.find({
            userId: userId
        }).sort({createdAt: 'desc'}).exec();

        const petGenders = await this.petGendersModel.find().exec();
        const petTypes = await this.petTypesModel.find().exec();

        if (donations) {
            for (let donation of donations) {
                const pet = await this.petModel.findById(donation.petId).exec();

                let interestedUser;

                if (donation.interestedUserId) {
                    interestedUser = await this.userModel.findById(donation.interestedUserId).exec();
                }

                result.push({
                    id: donation.id,
                    userId: donation.userId,
                    username: donation.username,
                    petId: pet.id,
                    petName: pet.name,
                    petImg: pet.img,
                    petGenderId: pet.petGenderId,
                    petGender: petGenders.find(f => f.id == pet.petGenderId).description,
                    petTypeId: pet.petTypeId,
                    petType: petTypes.find(f => f.id == pet.petTypeId).description,
                    petBreed: pet.breed,
                    petAge: pet.age,
                    rateTraining: pet.rateTraining,
                    rateFriendly: pet.rateFriendly,
                    rateLikesTours: pet.rateLikesTours,
                    rateLikesChild: pet.rateLikesChild,
                    state: donation.state,
                    city: donation.city,
                    lng: donation.lng,
                    lat: donation.lat,
                    contacts: donation.contacts,
                    interestedUserId: interestedUser?.id,
                    interestedUsername: interestedUser?.username,
                    interestedUserFlagged: interestedUser?.interestedUserFlagged,
                    interestedUserImg: interestedUser?.img,
                    status: donation.status,
                    statusSeverity: donation.statusSeverity,
                    rating: donation.rating,
                    date: donation.date,
                    donated: donation.donated,
                    signalDate: donation.signalDate,
                    donatedToInstitution: donation.donatedToInstitution
                });
            }
        }
        return result;
    }

    async getFlaggedDonations(dto: GetFlaggedDonationsDto): Promise<DonationResult[]> {
        let result: DonationResult[] = [];
        const {userId, donatedToInstitution} = dto;

        const donations = await this.donationModel.find({
            interestedUserId: userId, donatedToInstitution
        }).sort({createdAt: 'desc'}).exec();

        const petGenders = await this.petGendersModel.find().exec();
        const petTypes = await this.petTypesModel.find().exec();

        if (donations) {
            for (let donation of donations) {
                const pet = await this.petModel.findById(donation.petId).exec();

                let interestedUser;

                if (donation.interestedUserId) {
                    interestedUser = await this.userModel.findById(donation.interestedUserId).exec();
                }

                result.push({
                    id: donation.id,
                    userId: donation.userId,
                    username: donation.username,
                    petId: pet.id,
                    petName: pet.name,
                    petImg: pet.img,
                    petGenderId: pet.petGenderId,
                    petGender: petGenders.find(f => f.id == pet.petGenderId).description,
                    petTypeId: pet.petTypeId,
                    petType: petTypes.find(f => f.id == pet.petTypeId).description,
                    petBreed: pet.breed,
                    petAge: pet.age,
                    rateTraining: pet.rateTraining,
                    rateFriendly: pet.rateFriendly,
                    rateLikesTours: pet.rateLikesTours,
                    rateLikesChild: pet.rateLikesChild,
                    state: donation.state,
                    city: donation.city,
                    lng: donation.lng,
                    lat: donation.lat,
                    contacts: donation.contacts,
                    interestedUserId: interestedUser?.id,
                    interestedUsername: interestedUser?.username,
                    interestedUserFlagged: interestedUser?.interestedUserFlagged,
                    interestedUserImg: interestedUser?.img,
                    status: donation.status,
                    statusSeverity: donation.statusSeverity,
                    rating: donation.rating,
                    date: donation.date,
                    donated: donation.donated,
                    signalDate: donation.signalDate,
                    donatedToInstitution: donation.donatedToInstitution
                });
            }
        }
        return result;
    }

    async signalDonation(dto: SignalDonationDto): Promise<SignalDonationResult> {
        let result: SignalDonationResult;
        const {donationId, userId, username} = dto;

        const donation = await this.donationModel.findById(donationId).exec();
        const interestedUser = await this.userModel.findById(userId).exec();

        if (interestedUser.isInstitution) {
            await this.donationModel.findByIdAndUpdate(donationId, {
                interestedUserId: interestedUser.id,
                interestedUsername: interestedUser.username,
                interestedUserFlagged: true,
                status: `${DonatePetStatusMessage.FlaggedBy} ${interestedUser.username}`,
                statusSeverity: DonatePetStatusSeverity.Warning,
                signalDate: new Date().toLocaleDateString()
            })

            result = {success: true, message: SignalDonationMessage.Success}

        } else {
            const userDonations = await this.donationModel.find({
                userId, donated: false,
            }).exec();

            if (userDonations.length > 0) {
                result = {success: false, message: SignalDonationMessage.DonationsInProgress};
            } else {
                const interestedDonations = await this.donationModel.find({
                    interestedUserId: userId
                }).exec();

                if (interestedDonations.length < 2) {
                    await this.donationModel.findByIdAndUpdate(donationId, {
                        interestedUserId: userId,
                        interestedUsername: username,
                        interestedUserFlagged: true,
                        status: `Sinalizado por ${username}`,
                        statusSeverity: 'warning',
                        signalDate: new Date().toLocaleDateString()
                    })

                    result = {success: true, message: SignalDonationMessage.Success}
                } else {
                    result = {success: false, message: SignalDonationMessage.FlagsExceeded};
                }
            }
        }

        if (result.success) {
            const pet = await this.petModel.findById(donation.petId).exec();
            const user = await this.userModel.findById(donation.userId).exec();

            this.mailService.sendSignalDonation(user.email, interestedUser.username, pet.name);
        }

        return result;
    }

    async updateDonationStatus(dto: UpdateDonationStatusDto): Promise<UpdateDonationStatusResult> {
        let result: UpdateDonationStatusResult = {success: false, message: UpdateDonationStatusMessage.Error};

        const {donationId, data, userId, username} = dto;

        const donation = await this.donationModel.findByIdAndUpdate(
            donationId, data, {
                returnDocument: 'after'
            }).exec();

        if (donation) {
            const pet = donation.donated ? await this.petModel.findByIdAndUpdate(donation.petId, {
                isDonated: true,
                inDonation: false
            }, {
                returnDocument: 'after'
            }) : await this.petModel.findById(donation.petId).exec();

            const user = await this.userModel.findById(donation.userId).exec();
            const interestedUser = await this.userModel.findById(donation.interestedUserId).exec();

            this.mailService.sendDonationStatus(interestedUser.email, username, pet.name);
            this.mailService.sendDonationStatus(user.email, username, pet.name);

            result = {success: true, message: UpdateDonationStatusMessage.Success};
        }

        return result;
    }

    async deleteDonation(dto: DeleteDonationDto): Promise<DeleteDonationResult> {
        let result: DeleteDonationResult = {success: false, message: DeleteDonationMessage.Error};
        const {donationId, petId, userId} = dto;

        const deleted = await this.donationModel.deleteOne({
            _id: donationId,
            userId
        }).exec();

        if (deleted) {
            await this.petModel.findByIdAndUpdate(petId, {
                inDonation: false,
                isDonated: false,
                $unset: {donationId: ''}
            }).exec();

            result = {success: true, message: DeleteDonationMessage.Success};
        }
        return result;
    }

    async getDonation(dto: GetDonationDto): Promise<DonationResult> {
        let result: DonationResult;

        const donation = await this.donationModel.findById(dto.donationId).exec();

        const user = await this.userModel.findById(donation.userId).exec();

        const petGenders = await this.petGendersModel.find().exec();
        const petTypes = await this.petTypesModel.find().exec();

        if (donation) {
            const pet = await this.petModel.findById(donation.petId).exec();

            result = {
                id: donation.id,
                userId: user.id,
                username: user.username,
                userImg: user.img,
                userIsInstitution: user.isInstitution,
                petId: pet.id,
                petName: pet.name,
                petImg: pet.img,
                petDescription: pet.description,
                petGenderId: pet.petGenderId,
                petGender: petGenders.find(f => f.id == pet.petGenderId).description,
                petTypeId: pet.petTypeId,
                petType: petTypes.find(f => f.id == pet.petTypeId).description,
                petBreed: pet.breed,
                petAge: pet.age,
                rateTraining: pet.rateTraining,
                rateFriendly: pet.rateFriendly,
                rateLikesTours: pet.rateLikesTours,
                rateLikesChild: pet.rateLikesChild,
                state: donation.state,
                city: donation.city,
                lng: donation.lng,
                lat: donation.lat,
                contacts: donation.contacts,
                interestedUserId: donation.interestedUserId,
                interestedUsername: donation.interestedUsername,
                interestedUserFlagged: donation.interestedUserFlagged,
                status: donation.status,
                statusSeverity: donation.statusSeverity,
                rating: donation.rating,
                feedback: donation.feedback,
                date: donation.date,
                donated: donation.donated,
                signalDate: donation.signalDate,
                donatedToInstitution: donation.donatedToInstitution
            };
        }
        return result;
    }
}
