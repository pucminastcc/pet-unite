export interface AuthenticatedUserResult {
  id: string;
  username: string;
  email: string;
  provider: string;
  img: string;
  isSuperUser: boolean;
  isInstitution: boolean;
  personTypeId?: string;
  document?: string;
  zipCode?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
  complement?: string;
}
