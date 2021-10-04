import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global }  from 'src/app/services/global';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers:[
    UserService,
    JwtHelperService
  ]
})
export class UserLoginComponent implements OnInit {

  invalidLogin: boolean;
  page_title;
  
  user;
  url;
  token;


  //auth0 jwt
  public helper ;
  public identity;
  public expirationDate;
  public isExpired;
  //
  

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _jwtHelperServ: JwtHelperService

  ) { 
      this.user = new User(1,'','','','','','','','','','');
      this.page_title = "Login";
      this.url = global.url;

  }

  ngOnInit(): void {

    //this._userService.testAuthenticate();
  
  }





  onSubmit(loginForm){

    this._userService.loginUser(this.user).subscribe(
      response =>{
        
        this.token = response.token;  
        this.identity = this._jwtHelperServ.decodeToken(this.token);

        localStorage.setItem("jwt", this.token);
        localStorage.setItem("identity", JSON.stringify(this.identity));

       // console.log(localStorage.getItem("identity"));

        this._router.navigate(['home']);
        loginForm.reset();

      },
      error =>{
        console.log(error);
      }
    );


  }

}
