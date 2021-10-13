import {Injectable} from '@nestjs/common';
import {Command} from 'libs/core/base/command';
import {LoginDto} from '../models/dtos/login.dto';
import {LoginResult} from '../models/results/login.result';
import {AuthRepository} from '../../../infra/auth/repositories/auth.repository';

@Injectable()
export class LoginCommand implements Command<LoginDto, LoginResult> {
    constructor(
        private readonly repos: AuthRepository
    ) {
    }

    execute(params: LoginDto): Promise<LoginResult> {
        return this.repos.login(params);
    }
}
