export interface UserBaseResult {
  id: string;
  img: string;
  username: string;
  email: string;
  provider: string;
  isSuperUser: boolean;
  blocked: boolean;
}
