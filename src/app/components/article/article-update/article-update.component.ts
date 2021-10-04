import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from 'protractor';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { global }  from 'src/app/services/global';
import { TipoArticleService } from 'src/app/services/tipo-article.service';


@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css'],
  providers:[
    ArticleService,
    CategoryService,
    TipoArticleService
  ]
})
export class ArticleUpdateComponent implements OnInit {

  resetVar;

  url;
  page_title;
  article : Article;
  categories;
  tiposArticulo; 
  chkSel = [];


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService,
    private _categoryService: CategoryService,
    private _tipoArticleService : TipoArticleService,

  ) { 
    this.url = global.url;
    this.page_title = "Actualizar articulo";
    this.article = new Article(1,1,'','',1,1,1,'',true,true,'','','');
    this.tiposArticulo = [];
  }


  ngOnInit(): void {
    this.getCategories();
    this.getArticle();
    this.loadTipoArticulo()
  }


  onSubmit(articleForm){
    if(this.article.idcategoria == 0){
      alert("seleccione categoria");
      document.getElementById("category").focus();
    }

    this._articleService.updateArticle(this.article).subscribe(
      response =>{
        this._router.navigate(['/article']);
        articleForm.reset();

      },
      error =>{
        console.log(error);
      }
    );
  }


  calcularUtilidad(utilidad){
    //console.log(utilidad);
    this.article.precio_venta = +this.article.precio_compra + ((this.article.precio_compra * utilidad) / 100);
    //console.log(this.article.precio_venta);
  }



  getCategories(){
    this._categoryService.listarDropdown().subscribe(
      response =>{
        this.categories = response;
  //      console.log(this.categories);
      },error =>{

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
  //iniciar array vacio (0 Dato No Existe) 
  public datoExis =0;
  checked(art){
      
    this.chkSel.forEach((element1, indice) => {
      if(element1.idTipoArticulo == art.idTipoArticulo){    //console.log("Elem: " +this.chkSel[indice].idTipoArticulo);  console.log("Indice: "+ indice);
        this.chkSel.splice(indice, 1);
        //console.log(this.chkSel);
        this.datoExis++;
      }
    });

    if(this.datoExis == 0){
      this.chkSel.push({
        idTipoArticulo: art.idTipoArticulo
      });
    }
    
    this.article.tiposArt = this.chkSel;   //console.log(this.article.tiposArt);
    if(this.chkSel.length == 0){
      this.datoExis = 0;
    }

  }



  //Selecciona al cargar pagina
  recorrTipoArtic(art){
    if(art.tiposArt != null){
        art.tiposArt.forEach(artTi => {

        let element  = <HTMLInputElement> document.getElementById("checkbox"+artTi.idTipoArticulo);
        element.click(); 

      });  
    }
  }


  getArticle(){
    this._route.params.subscribe(
      params =>{
        let id = params['id'];

        this._articleService.getArticle(id).subscribe(
          response =>{
            this.article = response;

            //pause
            setTimeout( () => { 
              this.recorrTipoArtic(this.article);
            }, 1000 );


          },error =>{
            console.log(error);
          }
        );
      }
    );
  }



  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.article.foto = image_data.fileName;
  }


  public afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg, .png, .jpeg",
    maxSize: "50",
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



}
