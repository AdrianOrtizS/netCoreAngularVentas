import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { TipoArticleService } from 'src/app/services/tipo-article.service';

import { global }  from 'src/app/services/global';
import { CategoryService } from './../../../services/category.service';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers:[
    CategoryService,
    ArticleService,
    TipoArticleService
  ]
})
export class ArticleNewComponent implements OnInit {

  resetVar;

  page_title;
  article;
  categories = [];
  tiposArticulo = [];

  chkSel = [];
  url;

  constructor(
    private _categoryService : CategoryService,
    private _articleService : ArticleService,
    private _tipoArticleService : TipoArticleService,
    private _router : Router
  ) {
    this.page_title = "Nuevo artículo";
    this.article = new Article(1,1,'','',1,1,1,'',true,true,'','','');

    this.url = global.url;
  }

  loadCategory(){
    this._categoryService.listarDropdown().subscribe(
      response =>{
        this.categories = response;
      },
      error =>{
        console.log(error);
      }
    );
  }


  loadTipoArticulo(){
    this._tipoArticleService.listarCheck().subscribe(
      response =>{
        this.tiposArticulo = response;
      },
      error =>{
        console.log(error);
      }
    );
  }



  ngOnInit(): void {
    document.getElementById("category").focus();
    this.loadCategory();
    this.loadTipoArticulo();
  }

  

  onSubmit(articleForm){

//    console.log(this.article);

    if(this.article.idcategoria == 0){
      alert("seleccione categoria");
      document.getElementById("category").focus();
    }

    this._articleService.saveArticle(this.article).subscribe(
      response =>{
        this._router.navigate(['/article']);
        articleForm.reset();

      },
      error =>{
        console.log(error);
      }
    );
  }


  checked(art){
    // this.chkSel.push(art.idTipoArticulo);
    this.chkSel.push({
      idTipoArticulo: art.idTipoArticulo
    });
    this.article.tiposArt = this.chkSel;
  }


  imageUpload(data){
    let image_data = JSON.parse(data.response);
    //let image_data = data.response;
    this.article.foto = image_data.fileName;
  }


  public afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg, .png, .jpeg",
    maxSize: "80",
    uploadAPI:  {
      url: global.url+'/Articulos/Upload',
      headers: {
        // "Authorization" : ""
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Selecciona imagen',
    replaceTexts: {
      selectFileBtn: 'Seleccione foto',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Foto registrada  !',
      afterUploadMsg_error: 'Fallo al subir foto !'
    }
  };


  calcularUtilidad(utilidad){
    //console.log(utilidad);
    this.article.precio_venta = +this.article.precio_compra + ((this.article.precio_compra * utilidad) / 100);
    //console.log(this.article.precio_venta);
  }


}
