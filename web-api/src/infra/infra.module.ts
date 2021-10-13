import {Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {PetRepository} from './pet/respositories/pet.repository';

@Module({
    exports: [
        AuthRepository,
        PetRepository
    ],
    providers: [
        AuthRepository,
        PetRepository
    ],
})
export class InfraModule {
}
