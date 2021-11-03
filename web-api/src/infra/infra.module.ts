import {Global, Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {DatabaseModule} from './database/database.module';
import {JwtModule} from '@nestjs/jwt';

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
        AuthRepository
    ],
    providers: [
        AuthRepository
    ]
})
export class InfraModule {
}
