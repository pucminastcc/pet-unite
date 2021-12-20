import {AuthenticatedUserModel} from '../../models/authenticated-user.model';

export interface GetAuthenticatedUserInput {
  accessToken: string;
  user: AuthenticatedUserModel;
  message?: string;
}
