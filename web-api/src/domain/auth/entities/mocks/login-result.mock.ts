import {UserModel} from './user-model.mock';

export class LoginResult {
    accessToken: string;
    user: UserModel;
    message?: string;

    constructor(accessToken?: string, user?: UserModel, message?: string) {
        this.accessToken = accessToken;
        this.user = user;
        this.message = message;
    }
}
