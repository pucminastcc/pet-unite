import {Global, Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from 'libs/core/lib/database/schemas/user.schema';
import {PasswordResetSchema} from 'libs/core/lib/database/schemas/password-reset.schema';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'PasswordReset', schema: PasswordResetSchema},
        ])
    ],
    exports: [
        AuthRepository
    ],
    providers: [
        AuthRepository
    ]
})
export class InfraModule {
}
