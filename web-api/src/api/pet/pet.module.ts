import {Module} from '@nestjs/common';
import {PetController} from './controllers/pet.controller';
import {PetService} from './services/pet.service';
import {JwtStrategy} from '../auth/shared/guards/jwt.strategy';

@Module({
    imports: [],
    controllers: [PetController],
    providers: [
        PetService,
        JwtStrategy
    ]
})
export class PetModule {
}
