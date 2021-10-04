import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { tipoArticle } from 'src/app/models/tipoArticle';
import { TipoArticleService } from 'src/app/services/tipo-article.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-tipo-article-update',
  templateUrl: './tipo-article-update.component.html',
  styleUrls: ['./tipo-article-update.component.css'],
  providers:[
    TipoArticleService
  ]
})
export class TipoArticleUpdateComponent implements OnInit {

  page_title;
  tipoArticle;
  //categories = [];
  url;


  constructor(
    //private _categoryService : CategoryService,
    private _route: ActivatedRoute,

    private _tipoArticleService : TipoArticleService,
    private _router : Router
  ) {
    this.page_title = "Editar tipo artículo";
    this.tipoArticle = new tipoArticle(1,'',true);

    this.url = global.url;
  }



  ngOnInit(): void {

    this.getTipoArticle();

  }


  getTipoArticle(){
    this._route.params.subscribe(
      params =>{
        let id = params['id'];

        this._tipoArticleService.getTipoArticle(id).subscribe(
          response =>{
            this.tipoArticle = response;
//            console.log(this.article);


          },error =>{
            console.log(error);
          }
        );

      }
    );
  }


  

  onSubmit(tipoArticleForm){
    this._tipoArticleService.updateTipoArticulos(this.tipoArticle).subscribe(
      response =>{
        this._router.navigate(['/tipoArticle']);
        tipoArticleForm.reset();
      },
      error =>{
        console.log(error);
      }
    );
  }



 
}