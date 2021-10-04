import { Component, OnInit } from '@angular/core';
import { User } from './../../../models/user';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers:[
    UserService
  ]
})
export class UserListComponent implements OnInit {

  public url;
  public page_title;
  public users : Array<User> 
  public user ;

  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "USUARIO";
    this.url = global.url;
    this.user = new User(1,'','','','','','','','','','');
    this.campoBuscar = "nombre";
  }

  buscarPor() {
    this.campoBuscar;
  }


  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getUser(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  ngOnInit(): void {
    this.getUser(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
  }


  
  getUser( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.user.nombre = "";

    this._userService.getUsers(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.users = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");

       
      },
      error =>{
        console.error(error);
      }
    );
  }


  searchUser(valor ){
    this._userService.searchUser(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.users = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error+" Error search");
      }
    );
  }


  pageChange(event ){
    this.paginaActual = event ;
    this.cantidadRegistrosAMostrar = 5;
    this.getUser(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  desactivateUser(id){
    this._userService.desactivateUser(id).subscribe(
      response => {
        this.getUser(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  activateUser(id){
    this._userService.activateUser(id).subscribe(
      response => {
    this.getUser(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  pdfUsers(){
    console.log("pdf");
    //this._userService.pdfusers();
  }

 
}
