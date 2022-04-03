import {HttpModule, Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {LocalStrategy} from './shared/guards/local.strategy';
import {JwtStrategy} from './shared/guards/jwt.strategy';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {
}
