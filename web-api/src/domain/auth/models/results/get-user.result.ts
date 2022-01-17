import {UserModel} from '../user.model';

export interface GetUserResult {
    success: boolean;
    data: UserModel;
}
