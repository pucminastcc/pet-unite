import {AuthenticatedUserModel} from '../authenticated-user.model';

export interface LoginResult {
  accessToken: string;
  user: AuthenticatedUserModel;
  message?: string;
}
