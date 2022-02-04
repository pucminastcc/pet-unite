export interface AuthenticatedUserModel {
  id: string;
  email: string;
  username: string;
  img: string;
  isSuperUser: boolean;
  personTypeId?: string;
  document?: string;
  zipCode?: string;
  address?: string;
  district?: string;
  city?: string;
  state?: string;
  complement?: string;
  phone?: string;
  cell?: string;
  whatsapp?: string;
}
