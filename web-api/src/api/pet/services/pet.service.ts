import {Injectable} from '@nestjs/common';
import {IPetRepository} from '../../../domain/pet/repositories/ipet.repository';

@Injectable()
export class PetService implements IPetRepository{
    constructor(
    ) {
    }
}
