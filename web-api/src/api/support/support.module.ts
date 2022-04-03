import {Module} from '@nestjs/common';
import {JwtStrategy} from '../auth/shared/guards/jwt.strategy';
import { SupportController } from './controllers/support.controller';
import { SupportService } from './services/support.service';

@Module({
    imports: [],
    controllers: [SupportController],
    providers: [
        SupportService,
        JwtStrategy
    ]
})
export class SupportModule {
}
