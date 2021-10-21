import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {PasswordResetCodeSchema} from './schemas/password-reset-code.schema';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_CONN, {
                useNewUrlParser: true, useUnifiedTopology: true
            }
        ),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'PasswordResetCode', schema: PasswordResetCodeSchema},
        ]),
    ],
    exports: [MongooseModule]
})
export class DatabaseModule {
}
