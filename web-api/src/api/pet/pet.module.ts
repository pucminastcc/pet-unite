import {Module} from '@nestjs/common';
import {PetController} from './pet.controller';
import {PetService} from './services/pet.service';
import {DomainModule} from '../../domain/domain.module';

@Module({
    imports: [DomainModule],
    controllers: [PetController],
    providers: [PetService]
})
export class PetModule {
}
