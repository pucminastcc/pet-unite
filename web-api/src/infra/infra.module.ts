import {Global, HttpModule, Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {DatabaseModule} from './database/database.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigRepository} from './config/repositories/config.repository';
import {PetRepository} from './pet/repositories/pet.repository';
import {ManagerRepository} from './manager/repositories/manager.repository';
import {SupportRepository} from './support/repositories/support.repository';
import {DonationRepository} from './donation/repositories/donation.repository';

@Global()
@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '7200s'}
        }),
        HttpModule
    ],
    exports: [
        AuthRepository,
        ConfigRepository,
        PetRepository,
        ManagerRepository,
        SupportRepository,
        DonationRepository
    ],
    providers: [
        AuthRepository,
        ConfigRepository,
        PetRepository,
        ManagerRepository,
        SupportRepository,
        DonationRepository
    ]
})
export class InfraModule {
}
