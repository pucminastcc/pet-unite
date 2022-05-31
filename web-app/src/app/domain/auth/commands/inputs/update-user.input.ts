export interface UpdateUserInput {
  username: string;
  document: string;
  personTypeId: string;
  zipCode: string;
  address: string;
  district: string;
  cityId: string;
  state: string;
  complement: string;
  phone: string;
  cell: string;
  whatsapp: string;
  img: string;
  permissionRequest: boolean;
  accessToken?: string;
}
