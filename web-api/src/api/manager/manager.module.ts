import {Module} from '@nestjs/common';
import {JwtStrategy} from '../auth/shared/guards/jwt.strategy';
import {ManagerController} from './controllers/manager.controller';
import {ManagerService} from './services/manager.service';

@Module({
    imports: [],
    controllers: [ManagerController],
    providers: [
        ManagerService,
        JwtStrategy
    ]
})
export class ManagerModule {
}
