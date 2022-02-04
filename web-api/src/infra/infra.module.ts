import {Global, Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {DatabaseModule} from './database/database.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigRepository} from './config/repositories/config.repository';
import {PetRepository} from './pet/repositories/pet.repository';

@Global()
@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '7200s'}
        })
    ],
    exports: [
        AuthRepository,
        ConfigRepository,
        PetRepository
    ],
    providers: [
        AuthRepository,
        ConfigRepository,
        PetRepository
    ]
})
export class InfraModule {
}
