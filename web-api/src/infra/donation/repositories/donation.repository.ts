import {IDonationRepository} from '../../../domain/donation/repositories/idonation.repository';
import {DonatePetDto} from '../../../domain/donation/dtos/donate-pet.dto';
import {DonatePetResult} from '../../../domain/donation/models/results/donate-pet.result';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Donation} from '../../../domain/donation/models/donation.model';
import {Injectable} from '@nestjs/common';
import {User} from '../../../domain/auth/models/user.model';
import {Pet} from '../../../domain/pet/models/pet.model';
import {GetDonationsDto} from 'src/domain/donation/dtos/get-donations.dto';
import {DonationResult} from 'src/domain/donation/models/results/donation.result';
import {DonatePetMessage} from '../../../domain/donation/enums/donate-pet-message.enum';
import {SignalDonationInput} from '../../../domain/donation/dtos/signal-donation.input';
import {SignalDonationResult} from '../../../domain/donation/models/results/signal-donation.result';
import {BrazilCity} from '../../../domain/config/models/brazil-city.model';

@Injectable()
export class DonationRepository extends IDonationRepository {
    constructor(
        @InjectModel('Donation') private readonly donationModel: Model<Donation>,
        @InjectModel('BrazilCity') private readonly cityModel: Model<BrazilCity>,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Pet') private readonly petModel: Model<Pet>,
    ) {
        super();
    }

    async donatePet(dto: DonatePetDto): Promise<DonatePetResult> {
        let result: DonatePetResult = {success: false, message: DonatePetMessage.Error};
        const {petId, userId} = dto;

        const user = await this.userModel.findById(userId).exec();
        const pet = await this.petModel.findById(petId).exec();

        if (user && pet) {
            try {
                let contacts = [];

                if (user.whatsapp) {
                    contacts.push({description: 'Whatsapp', value: user.whatsapp});
                }
                if (user.cell) {
                    contacts.push({description: 'Celular', value: user.cell});
                }
                if (user.phone) {
                    contacts.push({description: 'Telefone', value: user.phone});
                }

                const city = await this.cityModel.findById(user.cityId).exec();

                const insert = await this.donationModel.insertMany({
                    userId: user.id,
                    username: user.username,
                    petId: pet.id,
                    petImg: pet.img,
                    petName: pet.name,
                    state: user.state,
                    city: city.description,
                    lng: city.lng,
                    lat: city.lat,
                    contacts: contacts
                });

                if (insert) {
                    const data = insert.find(e => true);
                    const updatePet = await this.petModel.findByIdAndUpdate(pet.id, {
                        inDonation: true,
                        donationId: data.id
                    });
                }

                result = {success: true, message: DonatePetMessage.Success};
            } catch (e) {
            }
        }
        return result;
    }

    async getDonations(dto: GetDonationsDto): Promise<DonationResult[]> {
        let result: DonationResult[] = [];
        const {userId} = dto;

        const donation = await this.donationModel.find().exec();

        if (donation) {
            result = donation.map((donation: Donation) => {
                return {
                    id: donation.id,
                    userId: donation.userId,
                    username: donation.username,
                    petId: donation.petId,
                    petName: donation.petName,
                    petImg: donation.petImg,
                    petGenderId: donation.petGenderId,
                    state: donation.state,
                    city: donation.city,
                    lng: donation.lng,
                    lat: donation.lat,
                    contacts: donation.contacts,
                    interestedUserId: donation.interestedUserId,
                    interestedUsername: donation.interestedUsername,
                    interestedUserFlagged: donation.interestedUserFlagged,
                    userFlagged: donation.userFlagged,
                    ratting: donation.userFlagged,
                }
            });
        }
        return result;
    }

    async signalDonation(dto: SignalDonationInput): Promise<SignalDonationResult> {
        let result: SignalDonationResult = {success: false, message: 'Algumas informações do perfil estão faltando!'};
        const {donationId, userId, username} = dto;
        try {
            const donations = await this.donationModel.find({
                interestedUserId: userId
            }).exec();

            if (donations.length < 1) {
                const patch = await this.donationModel.findByIdAndUpdate(donationId, {
                    interestedUserId: userId,
                    interestedUsername: username,
                    interestedUserFlagged: true,
                })

                result = {success: true, message: 'Doação sinalizada, aguarde a confirmação do doador!'}
            } else {
                result = {success: false, message: 'Você atingiu o número máximo de sinalizações, aguarde respostas!'};
            }
        } catch (e) {
        }
        return result;
    }
}
