import { Injectable } from '@angular/core';

//HttpClient => se comunica con el backend  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

//pasa mensajes service-component con suscripcion
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public url;
  public headers;
  

  constructor(
    private _http: HttpClient
  ) 
  { 
    this.url = global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getArticles(pagina:number, cantidadElementosAMostrar: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());

    return this._http.get(this.url + '/Articulos/Listar',  {headers: this.headers, observe: 'response', params});
  }


    searchArticle(campo, valor,pagina:number, cantidadElementosAMostrar: number):Observable<any>{
      let params = new HttpParams();
      params = params.append('pagina', pagina.toString());
      params = params.append('recordsPorPagina', cantidadElementosAMostrar.toString());
  
      return this._http.get(this.url + '/Articulos/Buscar/'+campo+'/'+valor ,{headers: this.headers, observe: 'response', params});
    }
  
    desactivate(id):Observable<any>{
      return this._http.put(this.url + '/Articulos/Desactivar/'+id, {headers: this.headers});
    }
  
    activate(id):Observable<any>{
      return this._http.put(this.url + '/Articulos/Activar/'+id, {headers: this.headers});
    }

    saveArticle(article):Observable<any>{
      return this._http.post(this.url + '/Articulos/Crear',article, {headers: this.headers});
    }


    getArticle(articleId):Observable<any>{
      return this._http.get(this.url+'/Articulos/Mostrar/'+articleId,{headers: this.headers});
    }

    pdfArticles(){
      window.open(this.url+'/Articulos/Pdf');
      // this.headers = new HttpHeaders().set('Content-Type', 'application/pdf');
      // return this._http.get(this.url+'/Articulos/Pdf',{headers: this.headers});
    }

    pdfArticles2(){
      return this._http.get(this.url + '/Articulos/Pdf2',  {headers: this.headers, observe: 'response'});
    }



    updateArticle(article):Observable<any>{
      return this._http.put(this.url + '/Articulos/Actualizar',article, {headers: this.headers});
    }

    
}
