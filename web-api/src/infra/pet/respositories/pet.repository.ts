import {Injectable} from '@nestjs/common';
import {IPetRepository} from '../../../domain/pet/repositories/ipet.repository';

@Injectable()
export class PetRepository extends IPetRepository {
    constructor(
    ) {
        super();
    }
}
