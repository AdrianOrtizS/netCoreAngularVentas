import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  public url;
  public headers;

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getProviders(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Personas/ListarProveedores',  {headers: this.headers, observe: 'response', params});
  }


  searchProvider(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Personas/BuscarProveedores/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  saveProvider(Provider):Observable<any>{
    return this._http.post(this.url + '/Personas/Crear',Provider, {headers: this.headers});
  }


  getProvider(ProviderId):Observable<any>{
    //console.log(ProviderId);
    return this._http.get(this.url+'/Personas/MostrarProveedor/'+ProviderId,{headers: this.headers});
  }


  pdfProviders2():Observable<any>{
    return this._http.get(this.url+'/Personas/PdfProveedores2',{headers: this.headers});
  }



  pdfProviders(){
    window.open(this.url+'/Personas/PdfProveedores');
    // this.headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    // return this._http.get(this.url+'/Personas/Pdf',{headers: this.headers});
  }

  updateProvider(Provider):Observable<any>{
    return this._http.put(this.url + '/Personas/Actualizar',Provider, {headers: this.headers});
  }

}
