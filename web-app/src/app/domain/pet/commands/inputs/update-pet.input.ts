export interface UpdatePetInput {
  id: string;
  img: string;
  name: string;
  petGenderId: string;
  breed: string;
  description: string;
  accessToken?: string;
}
