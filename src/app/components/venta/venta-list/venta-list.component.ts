import { Component, OnInit } from '@angular/core';
import { Venta } from './../../../models/venta';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { VentaService } from './../../../services/venta.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.css'],
  providers:[
    VentaService,
    UserService
  ]
})
export class VentaListComponent implements OnInit {

  public url;
  public page_title;
  public ventas : Array<Venta> 
  public venta;

  public campoBuscar: string;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];
  
  
  constructor(
    private _ventaService: VentaService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Venta";
    this.url = global.url;

    //this.venta = new venta(1,1,1,'','','',new Date,'','','','', []);

    this.venta = new Venta(1,1,1,'0','','', new Date,0.0,0.0,'','','','',[]);



    this.campoBuscar = "num_comprobante";
  }

  buscarPor() {
    this.campoBuscar;
  }

  

  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getVenta(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  ngOnInit(): void {

    this.getVenta(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
  }


  
  getVenta( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.venta.num_comprobante = "";

    this._ventaService.getVentas(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.ventas = response.body;
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
    this.getVenta(this.paginaActual, this.cantidadRegistrosAMostrar);
  }


  searchVenta(valor){

    this._ventaService.searchVenta(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.ventas = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
    //    console.log(this.ventas);
      },
      error =>{
        console.error(error+" Error search");
      }
    );


  }



  anularVenta(id){
    this._ventaService.anular(id).subscribe(
      response => {
        this.getVenta(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error=>{
        console.log(error);
        
      }
    );
  }




  pdfVentas(){

  }


}
