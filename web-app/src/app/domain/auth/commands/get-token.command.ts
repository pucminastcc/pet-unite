import {Injectable} from '@angular/core';
import {GetTokenInput} from './inputs/get-token.input';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class GetTokenCommand {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params?: GetTokenInput): string {
    return this.repos.getToken(params);
  }
}
