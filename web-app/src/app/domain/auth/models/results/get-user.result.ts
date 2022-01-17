import {AuthenticatedUserModel} from '../authenticated-user.model';

export interface GetUserResult {
  success: boolean;
  data: AuthenticatedUserModel;
  message: string;
}
