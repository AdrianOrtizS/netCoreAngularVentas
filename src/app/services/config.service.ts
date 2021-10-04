import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url;
  public headers ;
  token;
  

  constructor(
    private _http: HttpClient,
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', "Bearer "+this.token);

  }


  getConfigurations(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Configuraciones/Listar',  {headers: this.headers, observe: 'response', params});
  }

  getConfiguration(ConfigId):Observable<any>{
    // console.log(ClientId);
     return this._http.get(this.url+'/Configuraciones/Mostrar/'+ConfigId,{headers: this.headers});
   }
 
  getIva():Observable<any>{
    return this._http.get(this.url + '/Configuraciones/ObtenerIva',  {headers: this.headers, observe: 'response'});
  }


  getSerie():Observable<any>{
    return this._http.get(this.url + '/Configuraciones/ObtenerSerie',  {headers: this.headers, observe: 'response'});
  }



  searchConfiguration(valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

	  return this._http.get(this.url + '/Configuraciones/Buscar/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  saveConfiguration(configuration):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.url + '/Configuraciones/Crear', configuration ,{headers: this.headers});
  }

  updateConfiguration(configuration):Observable<any>{
  //  let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url + '/Configuraciones/Actualizar', configuration ,{headers: this.headers});
  }

  

}
