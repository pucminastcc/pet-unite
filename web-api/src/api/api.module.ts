import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {PetModule} from './pet/pet.module';

@Module({
    imports: [
        AuthModule,
        PetModule
    ],
})
export class ApiModule {
}
