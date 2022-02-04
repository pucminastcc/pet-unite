export interface CreatePetInput {
  img: string;
  name: string;
  petGenderId: string;
  breed: string;
  description: string;
  accessToken?: string;
}
