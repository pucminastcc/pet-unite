import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from './config/config.module';
import {PetModule} from './pet/pet.module';

@Module({
    imports: [AuthModule, ConfigModule, PetModule]
})
export class ApiModule {
}
