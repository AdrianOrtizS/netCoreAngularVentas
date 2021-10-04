import { Component, OnInit } from '@angular/core';
import { Article } from './../../../models/article';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ArticleService } from './../../../services/article.service';
import { UserService } from './../../../services/user.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers:[
    ArticleService,
    UserService
  ]
})
export class ArticleListComponent implements OnInit {

  public url;
  public page_title;
  public articles : Array<Article>;
  public articlesPdf ; 
  public article ;
  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _articleService: ArticleService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "ARTICULO";
    this.url = global.url;
    this.article = new Article(1,1,'','',1,1,1,'',true,true,'','','');
    this.campoBuscar = "nombre";

  }


  ngOnInit(): void {
    //  this._userService.testAuthenticate();
    this.getArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
    this.getArticlePdf();
  }
 
  

  getArticlePdf(){
    this._articleService.pdfArticles2().subscribe(
      response =>{
        this.articlesPdf = response.body;
        //console.log(this.articlesPdf);

      },error =>{
        console.log(error);
      }
    );
  }


  
  crearPdf() {
    var columns=[
      {title: "Nombre",     dataKey: "nombre"},
      {title: "Codigo",     dataKey: "codigo"},
      {title: "Categoria",  dataKey: "categoria"},
      {title: "Stock",      dataKey: "stock"},
      {title: "Precio venta", dataKey: "precio_venta"}//,      {title: "Foto", dataKey: "foto"}
    ];

    var rows=[];

    this.articlesPdf.map(function(x){
      rows.push(
        {
          nombre: x.nombre,
          codigo: x.codigo,
          categoria: x.categoria,
          stock: x.stock,
          precio_venta: x.precio_venta //,          foto:  x.foto
        }
      );
    });
    
  
    var doc = new jsPDF('p','pt');
    doc.autoTable(
      columns, rows, 
                    { margin: {top: 60},
                        addPageContent: function(data){
                          doc.text("Lista de Articulos", 40, 30);
                        }
                    });
    doc.save('Articulos.pdf');
  
  }



  buscarPor() {
    this.campoBuscar;
  }


  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  
  getArticle( pagina:number, cantidadRegistrosAMostrar:number){
    this.article.nombre = "";
    this._articleService.getArticles(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.articles = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error);
      }
    );
  }


  searchArticle(valor ){
    this._articleService.searchArticle(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.articles = response.body;
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
    this.getArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  desactivateArticle(id){
    this._articleService.desactivate(id).subscribe(
      response => {
        this.getArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  activateArticle(id){
    this._articleService.activate(id).subscribe(
      response => {
    this.getArticle(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  // pdfArticles(){
  // console.log("pdf");
  //   this._articleService.pdfArticles();
  // }

 
}
