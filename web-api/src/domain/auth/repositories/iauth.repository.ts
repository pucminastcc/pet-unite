import {LoginDto} from '../models/dtos/login.dto';
import {LoginResult} from '../models/results/login.result';

export abstract class IAuthRepository {
    abstract login(input: LoginDto): Promise<LoginResult>;
}
