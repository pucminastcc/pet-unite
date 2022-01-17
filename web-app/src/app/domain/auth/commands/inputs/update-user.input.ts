export interface UpdateUserInput {
  username: string;
  document: string;
  personTypeId: string;
  zipCode: string;
  address: string;
  district: string;
  city: string;
  state: string;
  complement: string;
  accessToken?: string;
}
