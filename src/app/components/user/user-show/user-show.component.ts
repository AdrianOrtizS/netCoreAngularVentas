import { Component, OnInit } from '@angular/core';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css'],
  providers:[
    UserService
  ]
})
export class UserShowComponent implements OnInit {

  public url;
  public page_title;
  public user ;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "USUARIO";
    this.url = global.url;
    this.user = new Object;
  }






  ngOnInit(): void {
    
    this.getUser();
//    setTimeout(myFunction, 5000);
            
  }


  getUser(){
    this._route.params.subscribe(params => {
      let id = params['id'];
        this._userService.getUser(id).subscribe(
          response =>{
            
            //setTimeout(myFunction, 5000);
  
            this.user = response;
           // console.log(this.user);
          },
          error =>{
            this._router.navigate(['inicio']);
          }
        );
    });
  }

  
}
