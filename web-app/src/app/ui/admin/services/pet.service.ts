import {Injectable} from '@angular/core';
import {IPetRepository} from '../../../domain/pet/repositories/ipet.repository';
import {AuthService} from '../../auth/services/auth.service';
import {Observable} from 'rxjs';
import {GetPetsInput} from '../../../domain/pet/commands/inputs/get-pets.input';
import {PetsResult} from '../../../domain/pet/models/results/pets.result';
import {GetPetsCommand} from '../../../domain/pet/commands/get-pets.command';
import {CreatePetCommand} from '../../../domain/pet/commands/create-pet.command';
import {CreatePetInput} from '../../../domain/pet/commands/inputs/create-pet.input';
import {CreatePetResult} from '../../../domain/pet/models/results/create-pet.result';
import {DeletePetInput} from '../../../domain/pet/commands/inputs/delete-pet.input';
import {DeletePetResult} from '../../../domain/pet/models/results/delete-pet.result';
import {DeletePetCommand} from '../../../domain/pet/commands/delete-pet.command';
import {GetPetInput} from 'src/app/domain/pet/commands/inputs/get-pet.input';
import {PetResult} from 'src/app/domain/pet/models/results/pet.result';
import {GetPetCommand} from '../../../domain/pet/commands/get-pet.command';
import {UpdatePetInput} from '../../../domain/pet/commands/inputs/update-pet.input';
import {UpdatePetResult} from '../../../domain/pet/models/results/update-pet.result';
import {UpdatePetCommand} from '../../../domain/pet/commands/update-pet.command';

@Injectable({
  providedIn: 'root'
})
export class PetService implements IPetRepository {
  private readonly accessToken: string;

  constructor(
    private readonly authService: AuthService,
    private readonly getPetsCommand: GetPetsCommand,
    private readonly createPetCommand: CreatePetCommand,
    private readonly deletePetCommand: DeletePetCommand,
    private readonly getPetCommand: GetPetCommand,
    private readonly updatePetCommand: UpdatePetCommand,
  ) {
    this.accessToken = authService.getToken();
  }

  getPets(input?: GetPetsInput): Observable<PetsResult[]> {
    return this.getPetsCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  createPet(input: CreatePetInput): Observable<CreatePetResult> {
    return this.createPetCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  deletePet(input: DeletePetInput): Observable<DeletePetResult> {
    return this.deletePetCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  getPet(input: GetPetInput): Observable<PetResult> {
    return this.getPetCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }

  updatePet(input: UpdatePetInput): Observable<UpdatePetResult> {
    return this.updatePetCommand.execute({
      ...input,
      accessToken: this.accessToken
    });
  }
}
