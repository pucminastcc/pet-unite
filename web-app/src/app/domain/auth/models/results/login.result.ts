import {UserModel} from '../user.model';

export interface LoginResult {
  accessToken: string;
  user: UserModel;
  message: string;
}
