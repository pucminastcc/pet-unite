export interface AuthenticatedUserModel {
  id: string;
  email: string;
  username: string;
  img: string;
  personTypeId?: string;
  document?: string;
  zipCode?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
  complement?: string;
}
