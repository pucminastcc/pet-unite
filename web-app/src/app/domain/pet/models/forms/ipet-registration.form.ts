export interface IPetRegistrationForm {
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
  age: number;
  ageType: string;
}
