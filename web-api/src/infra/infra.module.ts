import {Global, Module} from '@nestjs/common';
import {AuthRepository} from './auth/repositories/auth.repository';
import {DatabaseModule} from './database/database.module';

@Global()
@Module({
    imports: [
        DatabaseModule
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
