import { Component, OnInit } from '@angular/core';
import { Article } from './../../../models/article';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ArticleService } from './../../../services/article.service';

@Component({
  selector: 'app-article-show',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.css'],
  providers:[
    ArticleService
  ]
})
export class ArticleShowComponent implements OnInit {

  public url;
  public page_title;
  public article ;


  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Articulo";
    this.url = global.url;
    this.article = new Object;
  }


  ngOnInit(): void {
    
    this.getArticle();

  }


  getArticle(){
    this._route.params.subscribe(params => {
      let id = params['id'];
  
        this._articleService.getArticle(id).subscribe(
          response =>{
  
            //setTimeout(myFunction, 5000);
  
            this.article = response;
            //console.log(this.article);
  
          },
          error =>{
            this._router.navigate(['inicio']);
          }
        );
    });
  }


}
