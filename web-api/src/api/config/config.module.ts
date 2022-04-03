import {Module} from '@nestjs/common';
import {ConfigService} from './services/config.service';
import {ConfigController} from './controllers/config.controller';
import {JwtStrategy} from '../auth/shared/guards/jwt.strategy';

@Module({
    imports: [],
    controllers: [ConfigController],
    providers: [
        ConfigService,
        JwtStrategy
    ],
})
export class ConfigModule {
}
