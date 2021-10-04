import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';

import { global } from './services/global';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService,
   //IngresoService
  ]
})
export class AppComponent {
  title = 'web';
 
  public url;
  public identity;
  public token;

  //auth0 jwt
  public helper = new JwtHelperService();
  public decodedToken;
  public expirationDate;
  public isExpired;
  //



  constructor(
    private _router: Router,
    public _userService: UserService,
    
  ){
    this.url = global.url;

    this.identity = this._userService.getIdentity();
      
    this.token = this._userService.getToken();
    this.decodedToken  = this.helper.decodeToken(this.token);

    this.expirationDate = this.helper.getTokenExpirationDate(this.token);
    this.isExpired     = this.helper.isTokenExpired(this.token);

  }

  

  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    
    this.token = this._userService.getToken(); 
  }




  isExpiredToken(){
    if(this.isExpired){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.removeItem('prodselect');
      this._router.navigate(['login']);
    }
  }



  ngOnInit(): void{
      console.log('WebApp cargado correctamente');
      this.isExpiredToken();

          
      
    }


    logout(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this._router.navigate(['login']);

    }

}
