import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url;
  public headers ;
  token;

  

  constructor(
    private _http: HttpClient,
    private _userService : UserService
  ) 
  { 
    this.token = _userService.getToken();
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', "Bearer "+this.token);
       
      // console.log(this.url+"/notify");
      // let builder = new HubConnectionBuilder();
      // this.hubConnection = builder.withUrl(this.url+"/notify")
      //                       .build();
      // this.hubConnection.on("enviaratodos", data => {
      //     console.log(data);
      // });
      // this.hubConnection.start();

  }


  getCategories(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
 //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    console.log(this.url + '/Categorias/Listar');

    return this._http.get(this.url + '/Categorias/Listar',  {headers: this.headers, observe: 'response', params});
  }



  listarDropdown():Observable<any>{
    return this._http.get(this.url + '/Categorias/ListarDropdown',  {headers: this.headers});
  }



  searchCategory(campo,valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

	  return this._http.get(this.url + '/Categorias/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }

  desactivate(id):Observable<any>{
	//	let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/Categorias/Desactivar/'+id, {headers: this.headers});
  }

  activate(id):Observable<any>{
	//	let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/Categorias/Activar/'+id, {headers: this.headers});
  }

  saveCategory(category):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + '/Categorias/Crear', category ,{headers: this.headers});
  }

  updateCategory(category):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/Categorias/Actualizar', category ,{headers: this.headers});
  }

  

}
