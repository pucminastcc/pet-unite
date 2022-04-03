import {UserModel} from '../models/user.model';

export interface LoginDto {
    payload: UserModel;
    message?: string;
}
