import { Component, OnInit } from '@angular/core';
import { Provider } from './../../../models/provider';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ProviderService } from './../../../services/provider.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css'],
  providers:[
    ProviderService
  ]
})
export class ProviderListComponent implements OnInit {

  public url;
  public page_title;
  public providers : Array<Provider> 
  public provider ;
  public campoBuscar: string;
  public providersPdf ;


  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];



  constructor(
    private _providerService: ProviderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "PROVEEDORES";
    this.url = global.url;
    this.provider = new Provider(1,'','','','','','','');
    this.campoBuscar = "nombre";
  }

  ngOnInit(): void {
    this.getProvider(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
    this.getProviderPdf();
  }


  getProviderPdf(){
    this._providerService.pdfProviders2().subscribe(
      response =>{
        this.providersPdf = response;
        //console.log(response);

      },error =>{
        console.log(error);
      }
    );
  }


  buscarPor() {
    this.campoBuscar;
  }

  //numero de elementos a mostrar
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getProvider(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  getProvider( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.provider.nombre = "";

    this._providerService.getProviders(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.providers = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");

       // console.log(this.providers);
       
      },
      error =>{
        console.error(error);
      }
    );
  }

  searchProvider(valor ){
    this._providerService.searchProvider(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.providers = response.body;
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
    this.getProvider(this.paginaActual, this.cantidadRegistrosAMostrar);
  }



  crearPdf() {
    var columns=[
      {title: "Nombre",       dataKey: "nombre"},
      {title: "Tipo Documento",     dataKey: "tipo_documento"},
      {title: "Numero Documento",  dataKey: "num_documento"},
      {title: "Direccion",      dataKey: "direccion"},
      {title: "Telefono",     dataKey: "telefono"},
      {title: "Email",      dataKey: "email"}//,      {title: "Foto", dataKey: "foto"}
    ];

    var rows=[];

    this.providersPdf.map(function(x){
      rows.push(
        {
          nombre: x.nombre,
          tipo_documento: x.tipo_documento,
          num_documento: x.num_documento,
          direccion: x.direccion,
          telefono: x.telefono,
          email: x.email //,          foto:  x.foto
        }
      );
    });
    
  
    var doc = new jsPDF('p','pt');
    doc.autoTable(
      columns, rows, 
                    { margin: {top: 60},
                        addPageContent: function(data){
                          doc.text("Lista de Proveedores", 40, 30);
                        }
                    });
    doc.save('Proveedores.pdf');
  
  }




  // pdfProviders(){
  //   //console.log("pdf");
  //   this._providerService.pdfProviders();
  // }


}
