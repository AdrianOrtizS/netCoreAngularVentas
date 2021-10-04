import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { tipoArticle } from 'src/app/models/tipoArticle';
import { TipoArticleService } from 'src/app/services/tipo-article.service';
import { global }  from 'src/app/services/global';


@Component({
  selector: 'app-tipo-article-new',
  templateUrl: './tipo-article-new.component.html',
  styleUrls: ['./tipo-article-new.component.css'],
  providers:[
    TipoArticleService
  ]
})
export class TipoArticleNewComponent implements OnInit {

  page_title;
  tipoArticle;
  //categories = [];
  url;


  constructor(
    //private _categoryService : CategoryService,
    private _tipoArticleService : TipoArticleService,
    private _router : Router
  ) {
    this.page_title = "Nuevo tipo artículo";
    this.tipoArticle = new tipoArticle(1,'',true);

    this.url = global.url;
  }



  ngOnInit(): void {

  }

  

  onSubmit(tipoArticleForm){
    this._tipoArticleService.saveTipoArticulo(this.tipoArticle).subscribe(
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