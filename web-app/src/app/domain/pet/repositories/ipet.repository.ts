import {Observable} from 'rxjs';
import {GetPetsInput} from '../commands/inputs/get-pets.input';
import {PetsResult} from '../models/results/pets.result';
import {CreatePetInput} from '../commands/inputs/create-pet.input';
import {CreatePetResult} from '../models/results/create-pet.result';
import {DeletePetInput} from '../commands/inputs/delete-pet.input';
import {DeletePetResult} from '../models/results/delete-pet.result';
import {PetResult} from '../models/results/pet.result';
import {GetPetInput} from '../commands/inputs/get-pet.input';
import {UpdatePetInput} from '../commands/inputs/update-pet.input';
import {UpdatePetResult} from '../models/results/update-pet.result';
import {DonatePetInput} from '../commands/inputs/donate-pet.input';
import {DonatePetResult} from '../models/results/donate-pet.result';

export abstract class IPetRepository {
  abstract getPets(input: GetPetsInput): Observable<PetsResult[]>;

  abstract createPet(input: CreatePetInput): Observable<CreatePetResult>;

  abstract deletePet(input: DeletePetInput): Observable<DeletePetResult>;

  abstract getPet(input: GetPetInput): Observable<PetResult>;

  abstract updatePet(input: UpdatePetInput): Observable<UpdatePetResult>;

  abstract donatePet(input: DonatePetInput): Observable<DonatePetResult>;
}
