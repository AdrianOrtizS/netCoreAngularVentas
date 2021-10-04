import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _jwtHelperServ: JwtHelperService,

  ){
  }

  
  canActivate(){

    let token = this._userServices.getToken();
    let identity = this._userServices.getIdentity()

    const jwtValid = this._jwtHelperServ.isTokenExpired(token);

    if(token != null && identity != null && jwtValid == false){
      return true;
    }else{
      localStorage.removeItem("jwt");
      localStorage.removeItem("identity");
      this._router.navigate(['/login']);

      return false;
    } 
  }
  
}
