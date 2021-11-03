import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let isAuthenticated: boolean = false;

    await this.authService.getAuthenticatedUser()
      .toPromise()
      .then((data) => {
        isAuthenticated = !!data;
      });

    if(!isAuthenticated) {
      this.router.navigate(['/']).then(() => {
      });
    }

    return isAuthenticated;
  }
}
