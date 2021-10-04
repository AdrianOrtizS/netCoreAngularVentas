import { Component, OnInit } from '@angular/core';
import { Role } from './../../../models/rol';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css'],
  providers:[
    UserService
  ]
})
export class RolListComponent implements OnInit {

  
  public url;
  public page_title;
  public roles ; 

  constructor(
    private _userService : UserService,
    private _route: ActivatedRoute,
    private _router: Router
    ) 
    {
      this.page_title = "ROLES";
      this.url = global.url;
      this.roles = Array<Role>();
    }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this._userService.getRols().subscribe(
      response =>{
        this.roles = response;
//        console.log(this.role);
      },
      error => {

      }
    );
  }


  activateRol(idRol){
    this._userService.activateRol(idRol).subscribe(
      response =>{
        this.getRoles();
      },
      error => {

      }
    );
  }


  desactivateRol(idRol){
    this._userService.desactivateRol(idRol).subscribe(
      response =>{
        this.getRoles();
      },
      error => {

      }
    );
  }

}
