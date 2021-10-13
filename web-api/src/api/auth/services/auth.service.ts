import {Injectable} from '@nestjs/common';
import {IAuthRepository} from '../../../domain/auth/repositories/iauth.repository';
import {LoginDto} from '../../../domain/auth/models/dtos/login.dto';
import {LoginResult} from '../../../domain/auth/models/results/login.result';
import {LoginCommand} from '../../../domain/auth/commands/login.command';

@Injectable()
export class AuthService implements IAuthRepository {
    constructor(
        private readonly loginCommand: LoginCommand
    ) {
    }

    login(input: LoginDto): Promise<LoginResult> {
        return this.loginCommand.execute(input);
    }
}
