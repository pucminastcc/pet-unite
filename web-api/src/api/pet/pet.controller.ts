import {Controller} from '@nestjs/common';
import {PetService} from './services/pet.service';

@Controller('pet')
export class PetController {
    constructor(
        private readonly service: PetService
    ) {
    }
}
