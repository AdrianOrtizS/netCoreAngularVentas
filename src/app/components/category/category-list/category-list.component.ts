import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../models/category';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers:[
    CategoryService
  ]
})
export class CategoryListComponent implements OnInit {

  public url;
  public page_title;
  public categories : Array<Category> 
  public category ;

  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "CATEGORIA";
    this.url = global.url;
    this.category = new Category(1,'','',true);
    this.campoBuscar = "nombre";
  }


  buscarPor() {
    this.campoBuscar;
  }



  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getCategory(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  ngOnInit(): void {
    this.getCategory(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
  }

  
  getCategory( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.category.nombre = "";

    this._categoryService.getCategories(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.categories = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error);
      }
    );
  }


  searchCategory(valor ){
    this._categoryService.searchCategory(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.categories = response.body;
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
    this.getCategory(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  desactivateCategory(id){
    this._categoryService.desactivate(id).subscribe(
      response => {
        this.getCategory(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  activateCategory(id){
    this._categoryService.activate(id).subscribe(
      response => {
    this.getCategory(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  saveCategory(category){
    if(category.nombre==""){
      console.log("falta nombre");
    }
    if(category.descripcion==""){
      console.log("falta descripcion");
    }

    this._categoryService.saveCategory(category).subscribe(
      response =>{
        this.getCategory(this.paginaActual,this.cantidadRegistrosAMostrar);
        console.log("Exito al guardar");
        this.category.nombre = "";
        this.category.descripcion ="";
      },
      error =>{
        console.log(error);
        this.category.nombre = "";
        this.category.descripcion ="";
      }
    );
  }



  updateCategory(category){

    //console.log(category);

    if(category.nombre==""){
      console.log("falta nombre");
    }
    if(category.descripcion==""){
      console.log("falta descripcion");
    }

    this._categoryService.updateCategory(category).subscribe(
      response =>{
        this.getCategory(this.paginaActual,this.cantidadRegistrosAMostrar);
        console.log("Exito al actualizar");
        this.category.nombre = "";
        this.category.descripcion ="";
      },
      error =>{
        console.log(error);
        this.category.nombre = "";
        this.category.descripcion ="";
      }
    );



  }



}
