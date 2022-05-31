import {UserModel} from './user-model.mock';

export class GetUserResult {
    success: boolean;
    data: UserModel;

    constructor(success?: boolean, data?: UserModel) {
        this.success = success;
        this.data = data;
    }
}

