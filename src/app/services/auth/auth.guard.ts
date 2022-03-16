
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const authLocalStorageToken = `${environment.USERDATA_KEY}`;

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) {
      
      if (localStorage.getItem(authLocalStorageToken)) {
        // logged in so return true
        return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}