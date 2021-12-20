import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {LocalStrategy} from './shared/guards/local.strategy';
import {JwtStrategy} from './shared/guards/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {FacebookStrategy} from './shared/guards/facebook.strategy';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        FacebookStrategy,
    ],
})
export class AuthModule {
}
