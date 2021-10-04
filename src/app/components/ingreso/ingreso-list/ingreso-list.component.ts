import { Component, OnInit } from '@angular/core';
import { Ingreso } from './../../../models/ingreso';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { IngresoService } from './../../../services/ingreso.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ingreso-list',
  templateUrl: './ingreso-list.component.html',
  styleUrls: ['./ingreso-list.component.css'],
  providers:[
    IngresoService,
    UserService
  ]
})
export class IngresoListComponent implements OnInit {

  public url;
  public page_title;
  public ingresos : Array<Ingreso> 
  public ingreso;

  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _ingresoService: IngresoService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "INGRESO";
    this.url = global.url;

    //this.ingreso = new Ingreso(1,1,1,'','','',new Date,'','','','', []);

    this.ingreso = new Ingreso(1,1,1,'0','','', new Date,0.0,0.0,'','','',[]);



    this.campoBuscar = "num_comprobante";
  }

  buscarPor() {
    this.campoBuscar;
  }

  

  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getIngreso(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  ngOnInit(): void {

    this.getIngreso(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
  }


  
  getIngreso( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.ingreso.num_comprobante = "";

    this._ingresoService.getIngresos(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.ingresos = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");

      },
      error =>{
        console.error(error);
      }
    );
  }




  pageChange(event ){
    this.paginaActual = event ;
    this.cantidadRegistrosAMostrar = 5;
    this.getIngreso(this.paginaActual, this.cantidadRegistrosAMostrar);
  }


  searchIngreso(valor){

    this._ingresoService.searchIngreso(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.ingresos = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
    //    console.log(this.ingresos);
      },
      error =>{
        console.error(error+" Error search");
      }
    );


  }



  anularIngreso(id){
    this._ingresoService.anular(id).subscribe(
      response => {
        this.getIngreso(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }




  pdfIngresos(){

  }

 
}
