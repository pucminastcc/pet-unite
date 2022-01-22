import {Module} from '@nestjs/common';
import {ConfigService} from './services/config.service';
import {ConfigController} from './controllers/config.controller';

@Module({
    imports: [],
    controllers: [ConfigController],
    providers: [
        ConfigService,
    ],
})
export class ConfigModule {
}
