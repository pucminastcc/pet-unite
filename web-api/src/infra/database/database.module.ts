import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {PasswordResetCodeSchema} from './schemas/password-reset-code.schema';
import {AccountSchema} from './schemas/account.schema';
import {PersonTypeSchema} from './schemas/person-type.schema';
import {PetSchema} from './schemas/pet.schema';
import {PetGendersSchema} from './schemas/pet-gender.schema';
import {BrazilStateSchema} from './schemas/state.schema';

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
            {name: 'PetGender', schema: PetGendersSchema},
            {name: 'BrazilState', schema: BrazilStateSchema},
        ]),
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {
}
