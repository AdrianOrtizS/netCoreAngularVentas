import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url;
  public headers;

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getClients(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Personas/ListarClientes',  {headers: this.headers, observe: 'response', params});
  }


  searchClient(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Personas/BuscarClientes/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  saveClient(Client):Observable<any>{
    return this._http.post(this.url + '/Personas/Crear',Client, {headers: this.headers});
  }


  getClient(ClientId):Observable<any>{
   // console.log(ClientId);
    return this._http.get(this.url+'/Personas/MostrarCliente/'+ClientId,{headers: this.headers});
  }

  pdfClients2():Observable<any>{
     return this._http.get(this.url+'/Personas/PdfClientes2',{headers: this.headers});
   }
 

  pdfClients(){
    window.open(this.url+'/Personas/PdfClientes');
    // this.headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    // return this._http.get(this.url+'/Personas/Pdf',{headers: this.headers});
  }

  updateClient(Client):Observable<any>{
    return this._http.put(this.url + '/Personas/Actualizar',Client, {headers: this.headers});
  }

}
