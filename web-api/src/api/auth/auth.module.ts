import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './services/auth.service';
import {DomainModule} from '../../domain/domain.module';

@Module({
    imports: [DomainModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
}
