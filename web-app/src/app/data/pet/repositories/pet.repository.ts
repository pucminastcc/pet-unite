import {IPetRepository} from '../../../domain/pet/repositories/ipet.repository';
import {Injectable} from '@angular/core';
import {ApiDatasource} from '../../datasources/api.datasource';
import {Observable} from 'rxjs';
import {GetPetsInput} from '../../../domain/pet/commands/inputs/get-pets.input';
import {PetsResult} from '../../../domain/pet/models/results/pets.result';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {CreatePetInput} from '../../../domain/pet/commands/inputs/create-pet.input';
import {CreatePetResult} from '../../../domain/pet/models/results/create-pet.result';
import {DeletePetInput} from '../../../domain/pet/commands/inputs/delete-pet.input';
import {DeletePetResult} from '../../../domain/pet/models/results/delete-pet.result';
import {GetPetInput} from '../../../domain/pet/commands/inputs/get-pet.input';
import {PetResult} from '../../../domain/pet/models/results/pet.result';
import {UpdatePetInput} from '../../../domain/pet/commands/inputs/update-pet.input';
import {UpdatePetResult} from '../../../domain/pet/models/results/update-pet.result';

@Injectable({
  providedIn: 'root'
})
export class PetRepository extends IPetRepository {
  constructor(
    private readonly api: ApiDatasource
  ) {
    super();
  }

  getPets(input: GetPetsInput): Observable<PetsResult[]> {
    const {accessToken} = input;
    return this.api.get<PetsResult[]>(`${environment.apiUrl}/pet`, accessToken)
      .pipe(map((result: PetsResult[]) => {
        return result;
      }));
  }

  createPet(input: CreatePetInput): Observable<CreatePetResult> {
    const {accessToken} = input;
    return this.api.post<CreatePetResult>(`${environment.apiUrl}/pet`, input, accessToken)
      .pipe(map((result: CreatePetResult) => {
        return result;
      }));
  }

  deletePet(input: DeletePetInput): Observable<DeletePetResult> {
    const {id, accessToken} = input;
    return this.api.delete<DeletePetResult>(`${environment.apiUrl}/pet?id=${id}`, accessToken)
      .pipe(map((result: DeletePetResult) => {
        return result;
      }));
  }

  getPet(input: GetPetInput): Observable<PetResult> {
    const {accessToken, id} = input;
    return this.api.get<PetResult>(`${environment.apiUrl}/pet/detail?id=${id}`, accessToken)
      .pipe(map((result: PetResult) => {
        return result;
      }));
  }

  updatePet(input: UpdatePetInput): Observable<UpdatePetResult> {
    const {accessToken} = input;
    return this.api.put<UpdatePetResult>(`${environment.apiUrl}/pet`, input, accessToken)
      .pipe(map((result: UpdatePetResult) => {
        return result;
      }));
  }
}
