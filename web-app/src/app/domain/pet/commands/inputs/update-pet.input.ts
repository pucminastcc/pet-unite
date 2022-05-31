export interface UpdatePetInput {
  id: string;
  img: string;
  name: string;
  petGenderId: string;
  petTypeId: string;
  breed: string;
  description: string;
  rateLikesChild: number;
  rateLikesTours: number;
  rateFriendly: number;
  rateTraining: number;
  age: string;
  accessToken?: string;
}
