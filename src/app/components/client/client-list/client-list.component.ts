import { Component, OnInit } from '@angular/core';
import { Client } from './../../../models/client';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ClientService } from './../../../services/client.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers:[
    ClientService
  ]
})
export class ClientListComponent implements OnInit {

  public url;
  public page_title;
  public clients : Array<Client> 
  public client ;
  public campoBuscar: string;
  public clientsPdf ;


  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];



  constructor(
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "CLIENTES";
    this.url = global.url;
    this.client = new Client(1,'','','','','','','');
    this.campoBuscar = "nombre";
  }

  ngOnInit(): void {
    this.getClient(this.paginaActual, this.cantidadRegistrosAMostrar);
    this.buscarPor();
    this.getClientPdf();
  }

  getClientPdf(){
    this._clientService.pdfClients2().subscribe(
      response =>{
        this.clientsPdf = response;
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
    this.getClient(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
  

  getClient( pagina:number, cantidadRegistrosAMostrar:number){
    
    this.client.nombre = "";

    this._clientService.getClients(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.clients = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");

       // console.log(this.clients);
       
      },
      error =>{
        console.error(error);
      }
    );
  }

  searchClient(valor ){
    this._clientService.searchClient(this.campoBuscar,valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.clients = response.body;
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
    this.getClient(this.paginaActual, this.cantidadRegistrosAMostrar);
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

    this.clientsPdf.map(function(x){
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
                          doc.text("Lista de Clientes", 40, 30);
                        }
                    });
    doc.save('Clientes.pdf');
  
  }

  // pdfClients(){
  //  // console.log("pdf");
  //   this._clientService.pdfClients();
  // }



}
