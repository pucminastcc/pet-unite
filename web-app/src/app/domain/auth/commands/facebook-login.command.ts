import {Injectable} from '@angular/core';
import {FacebookLoginInput} from './inputs/facebook-login.input';
import {AuthRepository} from '../../../data/auth/repositories/auth.repository';

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginCommand {
  constructor(
    private readonly repos: AuthRepository
  ) {
  }

  execute(params?: FacebookLoginInput): void {
    this.repos.facebookLogin(params);
  }
}
