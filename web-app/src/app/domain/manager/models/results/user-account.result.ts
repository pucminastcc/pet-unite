export interface UserAccountResult {
  id: string;
  email: string;
  username: string;
  terms: boolean;
  provider: string;
  img: string;
  isSuperUser: boolean;
  personType?: string;
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
