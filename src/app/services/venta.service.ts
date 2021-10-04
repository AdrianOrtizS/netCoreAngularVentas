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
export class VentaService {


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


  getSalesForMonth():Observable<any>{
    return this._http.get(this.url + '/Ventas/VentasMes12',  {headers: this.headers, observe: 'response'});
  }

  getProductMoreSale():Observable<any>{
    return this._http.get(this.url + '/Ventas/ProductosMasVendidos',  {headers: this.headers, observe: 'response'});
  }


  getLastSale():Observable<any>{
    return this._http.get(this.url + '/Ventas/UltimaFact',  {headers: this.headers, observe: 'response'});
  }



  getVentas(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Ventas/Listar',  {headers: this.headers, observe: 'response', params});
  }

  searchVenta(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Ventas/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  selectClientes(valor):Observable<any>{
    return this._http.get(this.url + '/Ventas/SelectClientes/'+valor,  {headers: this.headers, observe: 'response'});
  }


  SelectArticlePorCodigo(valor):Observable<any>{
//    console.log(valor);
    return this._http.get(this.url + '/Ventas/SelectArticuloPorCodigo/'+valor,  {headers: this.headers, observe: 'response'});
  }

  selectArticlePorNombre(valor, pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Ventas/BuscarArticlePorNombre/'+valor ,{headers: this.headers, observe: 'response', params});
  }


  anular(id):Observable<any>{
    return this._http.put(this.url + '/Ventas/Anular/'+id, {headers: this.headers});
  }

  

  saveVenta(venta):Observable<any>{
    return this._http.post(this.url + '/Ventas/Crear', venta, {headers: this.headers});
  }


  getVenta(ventaId):Observable<any>{
    return this._http.get(this.url+'/Ventas/Ver/'+ventaId,{headers: this.headers});
  }
  getDetallesVenta(ventaId):Observable<any>{
    return this._http.get(this.url+'/Ventas/VerDetalles/'+ventaId,{headers: this.headers});
  }


  pdfArticles(){
    window.open(this.url+'/Articulos/Pdf');
    // this.headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    // return this._http.get(this.url+'/Articulos/Pdf',{headers: this.headers});
  }



}
