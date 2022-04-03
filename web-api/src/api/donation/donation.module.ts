import {Module} from '@nestjs/common';
import {DonationService} from './services/donation.service';
import {DonationController} from './controllers/donation.controller';
import {JwtStrategy} from '../auth/shared/guards/jwt.strategy';

@Module({
    imports: [],
    controllers: [DonationController],
    providers: [
        DonationService,
        JwtStrategy
    ]
})
export class DonationModule {
}
