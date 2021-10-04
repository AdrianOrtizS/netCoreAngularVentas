import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';
//import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TipoArticleService {


  public url;
  public headers ;
  //token;


  constructor(
    private _http: HttpClient,
    //private _userService : UserService
  ) 
  { 
    //this.token = _userService.getToken();
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
                                    //.set('Authorization', "Bearer "+this.token)
  }


  getTiposArticle(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
 //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/TipoArticulos/Listar',  {headers: this.headers, observe: 'response', params});
  }


  listarDropdown():Observable<any>{
    return this._http.get(this.url + '/TipoArticulos/ListarDropdown',  {headers: this.headers});
  }



  listarCheck():Observable<any>{
    return this._http.get(this.url + '/TipoArticulos/ListarCheck',  {headers: this.headers});
  }


  
  searchTipoArticle(campo,valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

	  return this._http.get(this.url + '/TipoArticulos/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }



  getTipoArticle(tipoArticleId):Observable<any>{
    return this._http.get(this.url+'/TipoArticulos/Mostrar/'+tipoArticleId,{headers: this.headers});
  }


  desactivate(id):Observable<any>{
	//	let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/TipoArticulos/Desactivar/'+id, {headers: this.headers});
  }

  activate(id):Observable<any>{
	//	let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/TipoArticulos/Activar/'+id, {headers: this.headers});
  }

  saveTipoArticulo(tipoArticulos):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
		
    console.log(tipoArticulos);
  
    return this._http.post(this.url + '/TipoArticulos/Crear', tipoArticulos ,{headers: this.headers});
  }

  updateTipoArticulos(tipoArticulos):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/TipoArticulos/Actualizar', tipoArticulos ,{headers: this.headers});
  }





}
