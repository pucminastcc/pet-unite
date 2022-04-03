import {LoginResult} from './login.result';

export interface UpdateUserResult {
  success: boolean;
  auth: LoginResult;
  message: string;
}
