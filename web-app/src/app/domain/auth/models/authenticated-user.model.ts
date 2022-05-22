export interface AuthenticatedUserModel {
  id: string;
  username: string;
  email: string;
  provider: string;
  img: string;
  personTypeId?: string;
  isSuperUser: boolean;
  isInstitution: boolean;
  document?: string;
  zipCode?: string;
  address?: string;
  district?: string;
  cityId?: string;
  city?: string;
  state?: string;
  complement?: string;
  phone?: string;
  cell?: string;
  whatsapp?: string;
}
