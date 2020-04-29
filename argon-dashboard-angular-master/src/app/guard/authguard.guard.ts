import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router,NavigationExtras } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  public check;
  constructor(public usr: AuthenticationService, public route: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.check = this.usr.getUserLoggedIn();
    
    if(this.check){
      return true;
    }
    else{
      this.route.navigate(['/login'])
      return false;
    }
    
  }
}
