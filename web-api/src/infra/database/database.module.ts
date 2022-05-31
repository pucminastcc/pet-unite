import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {PasswordResetCodeSchema} from './schemas/password-reset-code.schema';
import {AccountSchema} from './schemas/account.schema';
import {PersonTypeSchema} from './schemas/person-type.schema';
import {PetSchema} from './schemas/pet.schema';
import {BrazilStateSchema} from './schemas/state.schema';
import {ReportSchema} from './schemas/report.schema';
import {ReportTypeSchema} from './schemas/report-type.schema';
import {DonationSchema} from './schemas/donation.schema';
import {BrazilCitySchema} from './schemas/city.schema';
import {RoleSchema} from './schemas/role.schema';
import {PetTypeSchema} from './schemas/pet-type.schema';
import {PetGenderSchema} from './schemas/pet-gender.schema';
import {PermissionRequestSchema} from './schemas/permission-request.schema';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_CONN, {
                useNewUrlParser: true, useUnifiedTopology: true
            }
        ),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'PasswordResetCode', schema: PasswordResetCodeSchema},
            {name: 'Account', schema: AccountSchema},
            {name: 'PersonType', schema: PersonTypeSchema},
            {name: 'Pet', schema: PetSchema},
            {name: 'PetType', schema: PetTypeSchema},
            {name: 'PetGender', schema: PetGenderSchema},
            {name: 'BrazilState', schema: BrazilStateSchema},
            {name: 'Report', schema: ReportSchema},
            {name: 'ReportType', schema: ReportTypeSchema},
            {name: 'Donation', schema: DonationSchema},
            {name: 'BrazilCity', schema: BrazilCitySchema},
            {name: 'Role', schema: RoleSchema},
            {name: 'PermissionRequest', schema: PermissionRequestSchema},
        ]),
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {
}
