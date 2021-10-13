import {Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginDto} from '../../../domain/auth/models/dtos/login.dto';
import {LoginResult} from '../../../domain/auth/models/results/login.result';

@Injectable()
export class AuthRepository extends IAuthRepository {
    constructor() {
        super();
    }

    async login(input: LoginDto): Promise<LoginResult> {
        return Promise.resolve(undefined);
    }
}
