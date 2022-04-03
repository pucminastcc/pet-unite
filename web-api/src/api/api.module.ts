import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from './config/config.module';
import {PetModule} from './pet/pet.module';
import {ManagerModule} from './manager/manager.module';
import {SupportModule} from './support/support.module';
import {DonationModule} from './donation/donation.module';

@Module({
    imports: [AuthModule, ConfigModule, PetModule, ManagerModule, SupportModule, DonationModule]
})
export class ApiModule {
}
