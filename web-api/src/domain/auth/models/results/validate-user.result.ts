import {UserModel} from '../user.model';

export interface ValidateUserResult {
    payload: UserModel;
    message: string;
}

