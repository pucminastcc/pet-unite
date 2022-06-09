import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {MailService} from '../../../shared/mail/services/mail.service';
import {UtilService} from '../../../shared/util/services/util.service';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {User, UserModel} from '../../../domain/auth/models/user.model';
import {ValidateLocalUserDto} from '../../../domain/auth/dtos/validate-local-user.dto';
import {ValidateUserResult} from '../../../domain/auth/models/results/validate-user.result';
import {LoginDto} from '../../../domain/auth/dtos/login.dto';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {LoginMessage} from '../../../domain/auth/enums/login-message.enum';
import {RegisterDto} from '../../../domain/auth/dtos/register.dto';
import {RegisterResult} from '../../../domain/auth/models/results/register.result';
import {RegisterMessage} from '../../../domain/auth/enums/register-message.enum';
import {SendPasswordResetCodeDto} from 'src/domain/auth/dtos/send-password-reset-code.dto';
import {SendPasswordResetCodeResult} from 'src/domain/auth/models/results/send-password-reset-code.result';
import {SendPasswordResetCodeMessage} from '../../../domain/auth/enums/send-password-reset-code-message.enum';
import {ValidatePasswordResetCodeDto} from 'src/domain/auth/dtos/validate-password-reset-code.dto';
import {ValidatePasswordResetCodeResult} from 'src/domain/auth/models/results/validate-password-reset-code.result';
import {ValidatePasswordResetCodeMessage} from '../../../domain/auth/enums/validate-password-reset-code-message.enum';
import {ChangePasswordDto} from 'src/domain/auth/dtos/change-password.dto';
import {ChangePasswordResult} from 'src/domain/auth/models/results/change-password.result';
import {ChangePasswordMessage} from '../../../domain/auth/enums/change-password-message.enum';
import {ConfirmEmailDto} from '../../../domain/auth/dtos/confirm-email.dto';
import {ConfirmEmailResult} from '../../../domain/auth/models/results/email-confirmation.result';
import {ConfirmEmailMessage} from '../../../domain/auth/enums/confirm-email-message.enum';
import {UpdateUserDto} from '../../../domain/auth/dtos/update-user.dto';
import {UpdateUserResult} from '../../../domain/auth/models/results/update-user.result';
import {GetUserDto} from '../../../domain/auth/dtos/get-user.dto';
import {GetUserResult} from '../../../domain/auth/models/results/get-user.result';
import {PasswordResetCode} from '../../../domain/auth/models/password-reset-code.model';
import {Account} from '../../../domain/auth/models/account.model';
import {UpdateUserMessage} from '../../../domain/auth/enums/update-user-message.enum';
import {ValidateFacebookUserDto} from '../../../domain/auth/dtos/validate-facebook-user.dto';
import {ValidateGoogleUserDto} from '../../../domain/auth/dtos/validate-google-user.dto';
import {BrazilCity} from '../../../domain/config/models/brazil-city.model';
import {PermissionRequest} from '../../../domain/manager/models/permission-request.model';
import {DonationChartResult} from '../../../domain/auth/models/results/donation-chart.result';
import {GetDonationChartDto} from '../../../domain/auth/dtos/get-donation-chart.dto';
import {Donation} from '../../../domain/donation/models/donation.model';
import {GetContributionChartDto} from '../../../domain/auth/dtos/get-contribution-chart.dto';
import {ContributionChartResult} from '../../../domain/auth/models/results/contribution-chart.result';
import {Report} from '../../../domain/manager/models/report.model';


@Injectable()
export class AuthRepository extends IAuthRepository {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Donation') private readonly donationModel: Model<Donation>,
        @InjectModel('Report') private readonly reportsModel: Model<Report>,
        @InjectModel('PasswordResetCode') private readonly passwordResetCodeModel: Model<PasswordResetCode>,
        @InjectModel('Account') private readonly accountModel: Model<Account>,
        @InjectModel('BrazilCity') private readonly citiesModel: Model<BrazilCity>,
        @InjectModel('PermissionRequest') private readonly permissionRequestModel: Model<PermissionRequest>,
        private readonly mailService: MailService,
        private readonly utilService: UtilService,
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService
    ) {
        super();
    }

    private getPayload(doc): UserModel {
        return {
            id: doc.id,
            username: doc.username,
            email: doc.email,
            provider: doc.provider,
            img: doc.img,
            isSuperUser: doc.isSuperUser,
            isInstitution: doc.isInstitution,
            personTypeId: doc.personTypeId,
            document: doc.document,
            zipCode: doc.zipCode,
            address: doc.address,
            district: doc.district,
            cityId: doc.cityId,
            state: doc.state,
            complement: doc.complement,
            phone: doc.phone,
            cell: doc.cell,
            whatsapp: doc.whatsapp,
            filledProfile: doc.filledProfile,
            requestedPermission: doc.requestedPermission
        };
    }

    async validateLocalUser(input: ValidateLocalUserDto): Promise<ValidateUserResult> {
        let result: ValidateUserResult = {payload: undefined, message: LoginMessage.UserNotFound};

        const {email, password} = input;
        const doc = await this.userModel.findOne({email, provider: 'application'}).exec();

        if (doc) {
            const isMatch = await bcrypt.compare(password, doc.password);
            if (isMatch) {
                if (!doc.activated) {
                    const userId = doc.id;
                    const enc = await this.utilService.encrypt(userId);
                    const token = `${enc.content}${enc.iv}`;

                    await this.accountModel.deleteMany({userId});
                    await this.accountModel.insertMany({token, userId});

                    this.mailService.sendUserConfirmation(doc, token);

                    result = {
                        ...result,
                        message: LoginMessage.YourAccountHasNotBeenActivated
                    }
                } else {
                    result = {
                        payload: this.getPayload(doc),
                        message: LoginMessage.UserIsAuthenticated
                    }
                }
            }
        }
        return result;
    }

    async validateFacebookUser(input: ValidateFacebookUserDto): Promise<ValidateUserResult> {
        let result: ValidateUserResult;

        const {email, firstName, photoUrl, provider, id, authToken} = input;

        let imageUrl = photoUrl.replace('type=normal', 'type=large');
        imageUrl = `${imageUrl}&access_token=${authToken}`;

        let image = await this.httpService.axiosRef.get(imageUrl, {responseType: 'arraybuffer'});
        let returnedB64 = `data:image/jpeg;base64,${Buffer.from(image.data).toString('base64')}`;

        const doc = await this.userModel.findOne({
            password: id, provider: provider.toLowerCase()
        }).exec();

        if (!doc) {
            const user: RegisterDto = {
                username: firstName,
                email: email,
                password: id,
                img: returnedB64,
                terms: true,
                activated: true,
                provider: provider.toLowerCase()
            };

            const insert = await (await this.userModel.insertMany(user)).find(e => true);

            result = {
                payload: this.getPayload(insert),
                message: LoginMessage.UserIsAuthenticated
            };
        } else {
            doc.img = returnedB64;

            result = {
                payload: this.getPayload(doc),
                message: LoginMessage.UserIsAuthenticated
            };
        }
        return result;
    }

    async validateGoogleUser(input: ValidateGoogleUserDto): Promise<ValidateUserResult> {
        let result: ValidateUserResult;

        const {email, firstName, photoUrl, provider, id, authToken} = input;

        let imageUrl = photoUrl.replace('-c', '-p');

        let image = await this.httpService.axiosRef.get(imageUrl, {responseType: 'arraybuffer'});
        let returnedB64 = `data:image/jpeg;base64,${Buffer.from(image.data).toString('base64')}`;

        const doc = await this.userModel.findOne({
            password: id, provider: provider.toLowerCase()
        }).exec();

        if (!doc) {
            const user: RegisterDto = {
                username: firstName,
                email: email,
                password: id,
                img: returnedB64,
                terms: true,
                activated: true,
                provider: provider.toLowerCase()
            };

            const insert = await (await this.userModel.insertMany(user)).find(e => true);

            result = {
                payload: this.getPayload(insert),
                message: LoginMessage.UserIsAuthenticated
            };
        } else {
            doc.img = returnedB64;

            result = {
                payload: this.getPayload(doc),
                message: LoginMessage.UserIsAuthenticated
            };
        }
        return result;
    }

    async login(input: LoginDto): Promise<LoginResult> {
        const {payload, message} = input;
        let result = {accessToken: undefined, user: payload, message};

        if (payload) {

            let latitude, longitude;

            if (payload.cityId) {
                const {lat, lng} = await this.citiesModel.findById(payload.cityId).exec();
                latitude = lat;
                longitude = lng;
            }

            result = {
                accessToken: this.jwtService.sign({...payload, img: ''}),
                user: {
                    id: payload.id,
                    username: payload.username,
                    provider: payload.provider,
                    email: payload.email,
                    document: payload.document,
                    img: payload.img,
                    isSuperUser: payload.isSuperUser,
                    isInstitution: payload.isInstitution,
                    zipCode: payload.zipCode,
                    address: payload.address,
                    district: payload.district,
                    cityId: payload.cityId,
                    state: payload.state,
                    complement: payload.complement,
                    phone: payload.phone,
                    cell: payload.cell,
                    whatsapp: payload.whatsapp,
                    lat: latitude,
                    lng: longitude,
                    filledProfile: payload.filledProfile,
                    requestedPermission: payload.requestedPermission
                },
                message
            }
        }
        return result;
    }

    async register(input: RegisterDto): Promise<RegisterResult> {
        let result: RegisterResult = {success: false, message: RegisterMessage.EmailAddressAlreadyExists};
        let {email, provider, password, activated} = input;
        provider = !provider ? 'application' : provider;

        const docExistingEmail = await this.userModel.findOne({
            email, provider
        }).exec();

        if (docExistingEmail) {
            throw new HttpException(result, HttpStatus.OK);
        }

        const salt = await bcrypt.genSalt();
        input.password = await bcrypt.hashSync(password, salt);

        const insert = await this.userModel.insertMany(input);

        if (insert) {
            const user = insert[0];
            const enc = await this.utilService.encrypt(user.id);
            const token = `${enc.content}${enc.iv}`

            if (!activated) {
                await this.accountModel.insertMany({
                    token, userId: user.id
                });

                try {
                    await this.mailService.sendUserConfirmation(user, token);
                } catch (error) {
                    await this.userModel.deleteOne({email: user.email});
                    error.statusCode = 400;
                    throw error;
                }
            }
            result = {success: true, message: RegisterMessage.SuccessfulRegistration};
        }
        return result;
    }

    async sendPasswordResetCode(input: SendPasswordResetCodeDto): Promise<SendPasswordResetCodeResult> {
        let result: SendPasswordResetCodeResult = {
            success: false,
            message: SendPasswordResetCodeMessage.EmailAddressNotFound
        };

        const {email} = input;
        const doc = await this.userModel.findOne({email, provider: 'application'}).exec();

        if (doc) {
            const generatedCode = await crypto.randomBytes(Math.ceil(10 / 2))
                .toString('hex')
                .slice(0, 10)
                .toUpperCase();

            const update = await this.passwordResetCodeModel.findOneAndUpdate({
                userId: doc._id
            }, {
                code: generatedCode
            }).exec();

            if (!update) {
                await this.passwordResetCodeModel.insertMany({
                    email: doc.email,
                    code: generatedCode
                });
            }

            await this.mailService.sendPasswordResetCode(doc.email, generatedCode);

            result = {success: true, message: SendPasswordResetCodeMessage.VerificationCodeSent};
            return result;
        }
        return result;
    }

    async validatePasswordResetCode(input: ValidatePasswordResetCodeDto): Promise<ValidatePasswordResetCodeResult> {
        let result: ValidatePasswordResetCodeResult = {
            success: false,
            message: ValidatePasswordResetCodeMessage.IsInvalidOrExpired,
            passwordResetCode: undefined
        };

        const {code, email} = input;
        const doc = await this.passwordResetCodeModel.findOne({code, email}).exec();

        if (doc)
            result = {
                success: true, message: ValidatePasswordResetCodeMessage.HasBeenSuccessfullyVerified,
                passwordResetCode: {
                    email: doc.email,
                    code: doc.code
                }
            };

        return result;
    }

    async changePassword(input: ChangePasswordDto): Promise<ChangePasswordResult> {
        let result: ChangePasswordResult = {success: false, message: ChangePasswordMessage.Error};
        const {email, code, password} = input;

        const docExistingCode = await this.passwordResetCodeModel.findOne({email, code}).exec();

        if (docExistingCode) {
            const salt = await bcrypt.genSalt();
            const encPassword = await bcrypt.hashSync(password, salt);

            const doc = await this.userModel.findOneAndUpdate({email, provider: 'application'}, {
                password: encPassword
            });

            if (doc)
                result = {success: true, message: ChangePasswordMessage.Success};
        }
        return result;
    }

    async confirmEmail(input: ConfirmEmailDto): Promise<ConfirmEmailResult> {
        let result: ConfirmEmailResult = {success: false, message: ConfirmEmailMessage.InvalidOrExpired};

        const {token} = input;
        const account = await this.accountModel.findOne({token}).exec();

        if (account) {
            const user = await this.userModel.findOne({_id: account.userId});
            if (user) {
                if (!user.activated) {
                    const id = user.id;
                    await this.userModel.findOneAndUpdate({_id: id}, {activated: true});
                    await this.accountModel.deleteOne({_id: account.id});

                    result = {success: true, message: ConfirmEmailMessage.Success}
                } else {
                    result = {success: false, message: ConfirmEmailMessage.YourAccountAlreadyActivated}
                }
            }
        }
        return result;
    }

    async getUser(input: GetUserDto): Promise<GetUserResult> {
        let result: GetUserResult = {success: false, data: undefined};
        const {id} = input;

        const user = await this.userModel.findById(id).exec();

        if (user) {
            result = {
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    provider: user.provider,
                    img: user.img,
                    isSuperUser: user.isSuperUser,
                    isInstitution: user.isInstitution,
                    personTypeId: user.personTypeId,
                    document: user.document,
                    zipCode: user.zipCode,
                    address: user.address,
                    district: user.district,
                    cityId: user.cityId,
                    state: user.state,
                    complement: user.complement,
                    phone: user.phone,
                    cell: user.cell,
                    whatsapp: user.whatsapp,
                    filledProfile: user.filledProfile,
                    requestedPermission: user.requestedPermission
                }
            }
        }
        return result;
    }

    async updateUser(input: UpdateUserDto): Promise<UpdateUserResult> {
        let result: UpdateUserResult = {success: false, auth: null, message: UpdateUserMessage.Error};
        const doc = {
            username: input.username,
            personTypeId: input.personTypeId,
            document: input.document,
            zipCode: input.zipCode,
            address: input.address,
            district: input.district,
            cityId: input.cityId,
            state: input.state,
            complement: input.complement,
            phone: input.phone,
            cell: input.cell,
            whatsapp: input.whatsapp,
            img: input.img,
            filledProfile: true
        };

        if (input?.permissionRequest) {
            doc['requestedPermission'] = true;
        }

        const updated = await this.userModel.findOneAndUpdate({
            _id: input.id
        }, doc, {returnDocument: 'after'});

        if (updated) {
            const payload = this.getPayload(updated);
            const auth = await this.login({
                payload
            });

            if (!updated.isInstitution && input?.permissionRequest) {
                const doc = {
                    userId: updated.id,
                    email: updated.email,
                    date: new Date().toLocaleDateString()
                }
                await this.permissionRequestModel.insertMany(doc);
            }

            result = {
                success: true,
                auth,
                message: UpdateUserMessage.Success
            }
        }

        return result;
    }

    async getDonationChart(input: GetDonationChartDto): Promise<DonationChartResult> {
        let result: DonationChartResult = {donations: [], adoptions: []};

        const donations = await this.donationModel.aggregate([
            {
                $group: {
                    _id: {
                        userId: '$userId',
                        month: {
                            $month: '$createdAt'
                        },
                        year: {
                            $year: '$createdAt'
                        }
                    },
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    userId: '$_id.userId',
                    year: '$_id.year',
                    count: '$count',
                    month: {
                        $arrayElemAt: [
                            ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            '$_id.month'
                        ]
                    }
                }
            },
            {
                $match: {
                    year: input.currentYear,
                    userId: new Types.ObjectId(input.userId)
                }
            }
        ]).exec();

        const adoptions = await this.donationModel.aggregate([
            {
                $group: {
                    _id: {
                        interestedUserId: '$interestedUserId',
                        month: {
                            $month: '$createdAt'
                        },
                        year: {
                            $year: '$createdAt'
                        }
                    },
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    interestedUserId: '$_id.interestedUserId',
                    year: '$_id.year',
                    count: '$count',
                    month: {
                        $arrayElemAt: [
                            ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            '$_id.month'
                        ]
                    }
                }
            },
            {
                $match: {
                    year: input.currentYear,
                    interestedUserId: new Types.ObjectId(input.userId)
                }
            }
        ]).exec();

        result = {
            donations,
            adoptions
        };

        return result;
    }

    async getContributionChart(input: GetContributionChartDto): Promise<ContributionChartResult> {
        let result: ContributionChartResult = {contributions: []};

        const labels: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        const donations = await this.donationModel.aggregate([
            {
                $group: {
                    _id: {
                        userId: '$userId',
                        month: {
                            $month: '$createdAt'
                        },
                        year: {
                            $year: '$createdAt'
                        }
                    },
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    userId: '$_id.userId',
                    year: '$_id.year',
                    count: '$count',
                    month: {
                        $arrayElemAt: [
                            ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            '$_id.month'
                        ]
                    }
                }
            },
            {
                $match: {
                    year: input.currentYear,
                    userId: new Types.ObjectId(input.userId)
                }
            }
        ]).exec();

        const adoptions = await this.donationModel.aggregate([
            {
                $group: {
                    _id: {
                        interestedUserId: '$interestedUserId',
                        month: {
                            $month: '$createdAt'
                        },
                        year: {
                            $year: '$createdAt'
                        }
                    },
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    interestedUserId: '$_id.interestedUserId',
                    year: '$_id.year',
                    count: '$count',
                    month: {
                        $arrayElemAt: [
                            ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            '$_id.month'
                        ]
                    }
                }
            },
            {
                $match: {
                    year: input.currentYear,
                    interestedUserId: new Types.ObjectId(input.userId)
                }
            }
        ]).exec();

        const reports = await this.reportsModel.aggregate([
            {
                $group: {
                    _id: {
                        userId: '$userId',
                        month: {
                            $month: '$createdAt'
                        },
                        year: {
                            $year: '$createdAt'
                        }
                    },
                    count: {
                        $sum: 1
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    userId: '$_id.userId',
                    year: '$_id.year',
                    count: '$count',
                    month: {
                        $arrayElemAt: [
                            ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                            '$_id.month'
                        ]
                    }
                }
            },
            {
                $match: {
                    year: input.currentYear,
                    userId: new Types.ObjectId(input.userId)
                }
            }
        ]).exec();

        labels.forEach((label: string) => {
            const donationsCount = donations.find(f => f.month === label) ? donations.find(f => f.month === label).count : 0;
            const adoptionsCount = adoptions.find(f => f.month === label) ? adoptions.find(f => f.month === label).count : 0;
            const reportsCount = reports.find(f => f.month === label) ? reports.find(f => f.month === label).count : 0;

            result.contributions.push({
                month: label,
                count: donationsCount + adoptionsCount + reportsCount
            });
        });

        return result;
    }
}
