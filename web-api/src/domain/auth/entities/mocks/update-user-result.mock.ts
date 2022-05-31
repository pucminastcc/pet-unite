import {LoginResult} from './login-result.mock';

export class UpdateUserResult {
    success: boolean;
    auth: LoginResult;
    message: string;

    constructor(success?: boolean, auth?: LoginResult, message?: string) {
        this.success = success;
        this.auth = auth;
        this.message = message;
    }
}

