import {Global, Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {DatabaseModule} from './database/database.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigRepository} from './config/repositories/config.repository';

@Global()
@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '3600s'}
        })
    ],
    exports: [
        AuthRepository,
        ConfigRepository
    ],
    providers: [
        AuthRepository,
        ConfigRepository
    ]
})
export class InfraModule {
}
