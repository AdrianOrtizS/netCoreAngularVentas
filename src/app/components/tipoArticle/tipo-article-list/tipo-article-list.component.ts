import { Component, OnInit } from '@angular/core';
import { tipoArticle } from './../../../models/tipoArticle';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { TipoArticleService } from './../../../services/tipo-article.service';
//import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-tipo-article-list',
  templateUrl: './tipo-article-list.component.html',
  styleUrls: ['./tipo-article-list.component.css'],
  providers:[
    TipoArticleService    
  ]
})
export class TipoArticleListComponent implements OnInit {

  public url;
  public page_title;
  public tipoArticulos : Array<tipoArticle> 
  public tipoArticulo ;

  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _tipoArticleService: TipoArticleService,
//    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "TIPO ARTICULO";
    this.url = global.url;
    this.tipoArticulo = new tipoArticle(1,'',true);
    this.campoBuscar = "tipoArticulo";
  }

  buscarPor() {
    this.campoBuscar;
  }


  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getTipoArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  ngOnInit(): void {

  //  this._userService.testAuthenticate();

    this.getTipoArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
  }


  
  getTipoArticle( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.tipoArticulo.tipoArticulo = "";

    this._tipoArticleService.getTiposArticle(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.tipoArticulos = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
 
      },
      error =>{
        console.error(error);
      }
    );
  }


  searchTipoArticle(valor ){
    this._tipoArticleService.searchTipoArticle(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.tipoArticulos = response.body;
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
    this.getTipoArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  desactivateTipoArticle(id){
    this._tipoArticleService.desactivate(id).subscribe(
      response => {
        this.getTipoArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  activateTipoArticle(id){
    this._tipoArticleService.activate(id).subscribe(
      response => {
    this.getTipoArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  pdfTipoArticles(){
    //console.log("pdf");
//    this._tipoArticleService.pdfTipoArticles();
  }

 

}
