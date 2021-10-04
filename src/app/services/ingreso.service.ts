import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';
import { HubConnectionBuilder, HubConnection} from '@aspnet/signalr';
//const signalR = require("@aspnet/signalr");

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  public url;
  public headers;
  public hubConnection: HubConnection;

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  
  }

  getIngresos(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Ingresos/Listar',  {headers: this.headers, observe: 'response', params});
  }

  searchIngreso(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Ingresos/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  selectProviders(valor):Observable<any>{
    return this._http.get(this.url + '/Ingresos/SelectProveedores/'+valor,  {headers: this.headers, observe: 'response'});
  }


  SelectArticlePorCodigo(valor):Observable<any>{
//    console.log(valor);
    return this._http.get(this.url + '/Ingresos/SelectArticuloPorCodigo/'+valor,  {headers: this.headers, observe: 'response'});
  }

  selectArticlePorNombre(valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Ingresos/BuscarArticlePorNombre/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  anular(id):Observable<any>{
    return this._http.put(this.url + '/Ingresos/Anular/'+id, {headers: this.headers});
  }

  

  saveIngreso(ingreso):Observable<any>{
    return this._http.post(this.url + '/Ingresos/Crear',ingreso, {headers: this.headers});
  }


  getIngreso(IngresoId):Observable<any>{
    return this._http.get(this.url+'/Ingresos/Ver/'+IngresoId,{headers: this.headers});
  }
  getDetallesIngreso(IngresoId):Observable<any>{
    return this._http.get(this.url+'/Ingresos/VerDetalles/'+IngresoId,{headers: this.headers});
  }







  pdfArticles(){
    window.open(this.url+'/Articulos/Pdf');
    // this.headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    // return this._http.get(this.url+'/Articulos/Pdf',{headers: this.headers});
  }


    
}