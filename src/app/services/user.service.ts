import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public headers;


	public token;
  public identity;



  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _jwtHelperServ: JwtHelperService,
    
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');

  }









  getIdentity(){
     let identity = localStorage.getItem('identity');
    if(identity && identity != "undefined"){
     
      this.identity = JSON.parse(identity) ;


//      console.log(this.identity);

     
    }else{
      this.identity = null;
    }
    return this.identity;
  }


  getToken(){
    let token = localStorage.getItem('jwt');
    if(token && token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }




  loginUser(user):Observable<any>{
    return this._http.post(this.url + '/Usuarios/Login',user, {headers: this.headers});
  }





  getRols():Observable<any>{
    return this._http.get(this.url + '/Rols/Listar',  {headers: this.headers});
  }

  
  getRolsDropdown():Observable<any>{
    return this._http.get(this.url + '/Rols/ListarDropdown',  {headers: this.headers});
  }


  desactivateRol(id):Observable<any>{
    return this._http.put(this.url + '/Rols/Desactivar/'+id, {headers: this.headers});
  }

  activateRol(id):Observable<any>{
    return this._http.put(this.url + '/Rols/Activar/'+id, {headers: this.headers});
  }


  getUsers(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Usuarios/Listar',  {headers: this.headers, observe: 'response', params});
  }


  searchUser(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Usuarios/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  save(user):Observable<any>{
    return this._http.post(this.url + '/Usuarios/Crear',user, {headers: this.headers});
  }


  getUser(userId):Observable<any>{
    //console.log(userId);
    return this._http.get(this.url+'/Usuarios/Mostrar/'+userId,{headers: this.headers});
  }

  pdfUsers(){
    window.open(this.url+'/Usuarios/Pdf');
    // this.headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    // return this._http.get(this.url+'/Personas/Pdf',{headers: this.headers});
  }

  desactivateUser(id):Observable<any>{
    return this._http.put(this.url + '/Usuarios/Desactivar/'+id, {headers: this.headers});
  }

  activateUser(id):Observable<any>{
    return this._http.put(this.url + '/Usuarios/Activar/'+id, {headers: this.headers});
  }



  updateUser(user):Observable<any>{
    return this._http.put(this.url + '/Usuarios/Actualizar',user, {headers: this.headers});
  }





}
