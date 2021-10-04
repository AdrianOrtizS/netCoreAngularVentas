import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { global }  from 'src/app/services/global';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { Article } from 'src/app/models/article';
import { ConfigService } from 'src/app/services/config.service';

import * as moment from 'moment';

@Component({
  selector: 'app-venta-new',
  templateUrl: './venta-new.component.html',
  styleUrls: ['./venta-new.component.css'],
  providers: [
    VentaService,
    ClientService,
    ArticleService,
    UserService,
    ConfigService
  ]
})
export class VentaNewComponent implements OnInit {

  public date; 
  public page_title;
  public url;

  public user;
  public clientes : Array<Client> 
  public cliente ;
  public campoBuscar: string;

  public article;
  public articles;
  public articuloModal;
  public arrayDetalle=[];
  public precio_venta2;
  public cantidad2;
  public descuento2;
  public descuentoTotal;
  public subtotal;
  public total;
  
  public iva;  // get iva of configuration
  public serie; // get sserie of configuration
  public impuesto0 ;
  public impuesto12;

  public lastSale;

  public valExiste;
  public validararticle;
  public validarprecio_venta;
  public validarcantidad;
  public validardescuento;

  public nextSale;
  public venta;
  
  list =[];
  model;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];

  
  constructor(
    private _ventaService : VentaService,
    private _clienteService : ClientService,
    private _articleService : ArticleService,
    private _userService: UserService,
    private _configService: ConfigService,
    private _router : Router

    ) {
    this.page_title = "NUEVA VENTA";
    this.cliente = new Client(1,'','','','','','','');
    this.article = new Article(1,1,'','',1,1,1,'',true,true,'','','');
    this.venta = new Venta(1,1,1,'0',1,'', new Date,0.0,0.0,'','','','',[]);
    this.url = global.url;
    this.user = new User(1,1,'','','','','','','','',''); 
    this.user = this._userService.getIdentity();
    this.validararticle  =0;
    this.validarprecio_venta    =0;
    this.validarcantidad  =0;
    this.validardescuento = 0;

    this.list =[
      {'id': 1, 'value':'Factura'},
      {'id': 2, 'value':'Recibo'}
    ];

    this.date = new Date().toLocaleString(); 
//    this.date = new Date(); 

  }



  ngOnInit(): void {
    this.venta.idusuario = this.user.idusuario;
    this.getIva();
    this.getSerie();
    this.getLastSale();
    this.getArticles( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  //buscar cliente Modal
  searchClienteModal($event ){
    $event.preventDefault();
    let clienteModal = (<HTMLInputElement>document.getElementById("clienteModal")).value;
    this._ventaService.selectClientes(clienteModal).subscribe(
      (response : HttpResponse<any>) =>{
        this.clientes = response.body;
        console.log(this.clientes);
      },
      error =>{
        console.error(error+" Error search");
      }
    );
  }


  agregarClienteModal(cli){
    console.log(cli);
    this.cliente = cli;
    this.venta.idcliente = this.cliente.idcliente;
    document.getElementById('closeModalCliente').click();
  }


  //buscar Articulo por Codigo
  buscarArticleCodigo(codigo){
    if(codigo.length >= 5){ 
      this._ventaService.SelectArticlePorCodigo(codigo).subscribe(
        (response : HttpResponse<any>)  =>{
          this.article = response.body;

          this.precio_venta2 = this.article.precio_venta;
          this.cantidad2 = 1;
          this.descuento2 = 0;
        },error=>{
          console.log(error);
        }
      );
    }
  }


  //Modal Articulos
  getArticles( pagina:number, cantidadRegistrosAMostrar:number){
    this.article.nombre = "";
    this._articleService.getArticles(pagina, cantidadRegistrosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
        this.articles = response.body;
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error);
      }
    );
  }


  //Modal Buscar Articulos
  buscarproductonombre(nombre, pagina:number, cantidadElementosAMostrar: number){
    this._ventaService.selectArticlePorNombre(nombre ,pagina, cantidadElementosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
      this.articles = response.body;

      },error=>{
        console.log(error.status);
      }
    );
  }

  
  //Modal Articulos cambio pagina
  pageChange(event ){
    this.paginaActual = event ;
    this.cantidadRegistrosAMostrar = 5;
    this.getArticles(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  //Numero de Elementos a mostrar en tabla de modal
  onTableSizesChanges(event):void{
    this.cantidadRegistrosAMostrar = event.target.value;
    this.paginaActual =1;
    this.getArticles(this.paginaActual, this.cantidadRegistrosAMostrar);
  }



  agregardetalle(event){

    //previene recargar la pagina
    event.preventDefault();
    
    //verifica si esta seleccionado article, cantidad , precio
    if(!this.article.codigo){
      this.validararticle=1;
    }else{this.validararticle=0}

    if(!this.precio_venta2){
      this.validarprecio_venta++;
    }else{this.validarprecio_venta=0;}
    
    if(!this.cantidad2){
      this.validarcantidad++;
    }else{this.validarcantidad=0;}

    // if(!this.descuento2){
    //   this.validardescuento++;
    // }else{this.validardescuento=0;}

    
    if(this.validararticle == 0 && this.validarprecio_venta == 0 && this.validarcantidad == 0  && this.article.nombre != "No hay el article" ){
      this.verificaExiste(this.article.codigo);
    
        if(this.valExiste == 0){
            
          this.arrayDetalle.push({
            idarticulo: this.article.id,
            codarticle: this.article.codigo,
            article:   this.article.nombre,
            iva: this.article.iva,
            cantidad:   this.cantidad2,
            precio_venta:     this.precio_venta2,
            descuento: this.descuento2
          });

            console.log("agregardetalle");
            console.log(this.arrayDetalle);

          this.encerar();
        }else{

            ///Modal sweet alert/////      
            // Swal.fire({
            // icon: 'error',
            // title: 'article ya agregado!',
            // text: 'verifique y vuelva a intentar'
            // })
            ///Fin modal sweet alert/////      

        }
    }
  }


  encerar(){
    this.article.id = '';
    this.article.nombre ='';
    this.cantidad2  ='';
    this.precio_venta2    ='';
    this.descuento2 ='';
  }

  verificaExiste(codigo){
    this.valExiste =0;
    for(let i=0; i < this.arrayDetalle.length; i++){
      if(codigo == this.arrayDetalle[i].codarticle){
        this.valExiste=1;
      }
    }
  }


  get valsubtotal() {

    this.subtotal=0.0;
    this.descuentoTotal=0.0;
    this.impuesto0 = 0.0;
    this.impuesto12 = 0.0;
    this.total = 0.0;
  
    for(var i=0; i < this.arrayDetalle.length; i++)
    {
      this.subtotal = this.subtotal + (this.arrayDetalle[i].precio_venta * this.arrayDetalle[i].cantidad) ;

      this.descuentoTotal = this.descuentoTotal +((this.arrayDetalle[i].precio_venta*this.arrayDetalle[i].cantidad)*this.arrayDetalle[i].descuento)/100

      if(this.arrayDetalle[i].iva == true){
        this.impuesto12 = this.impuesto12 + (((this.arrayDetalle[i].precio_venta*this.arrayDetalle[i].cantidad) - (((this.arrayDetalle[i].precio_venta*this.arrayDetalle[i].cantidad)*this.arrayDetalle[i].descuento)/100))*this.iva)/100;
      }
      if(this.arrayDetalle[i].iva == false){
        this.impuesto0 = this.impuesto0 +     ((this.arrayDetalle[i].precio_venta*this.arrayDetalle[i].cantidad) - (((this.arrayDetalle[i].precio_venta*this.arrayDetalle[i].cantidad)*this.arrayDetalle[i].descuento)/100));
      }
      this.total =  (this.subtotal - this.descuentoTotal) + this.impuesto12;
    }

    return [this.subtotal, this.descuentoTotal , this.impuesto0, this.impuesto12, this.total];
  }




  eliminardetalle(ind){
    //quitar posicion de indice , solo 1
    this.arrayDetalle.splice(ind,1);
    if(this.arrayDetalle.length<=0){
      this.subtotal=0.0;
      this.impuesto0 = 0.0;
      this.impuesto12 = 0.0;
      this.total = 0.0;
    }
  }



  getIva(){
    this._configService.getIva().subscribe(
        (response : HttpResponse<any>) =>{
        this.iva = response.body.valor;
      },error=>{
        console.log(error);
      }
    );
  }


  getSerie(){
    this._configService.getSerie().subscribe(
        (response : HttpResponse<any>) =>{
        this.serie = response.body.valor;
        this.venta.serie_comprobante = this.serie;
     //   console.log(this.venta);
        
      },error=>{
        console.log(error);
      }
    );
  }


  getLastSale(){
    this._ventaService.getLastSale().subscribe(
        (response : HttpResponse<any>) =>{
          
        this.lastSale = response.body.num_comprobante ;

        this.nextSale = (+this.lastSale) + 1;
        this.venta.num_comprobante = this.nextSale+"";

        let numCarSig = this.venta.num_comprobante.length;
        let ceros = 10 - numCarSig;
        let c="";
      
        for(let i =0 ; i < ceros; i++){
         c = c+"0"
        }
        this.venta.num_comprobante = c+this.venta.num_comprobante;

      },error=>{
        console.log(error);
      }
    );
  }

 

  seleccionarArticuloModal(art){
  
    this.articuloModal = new Object;
    this.articuloModal.idarticulo = art.idarticulo; 
    this.articuloModal.codigo = art.codigo; 
    this.articuloModal.nombre = art.nombre; 
    this.articuloModal.precio_venta = art.precio_venta; 
    this.articuloModal.iva = art.iva; 
    this.articuloModal.cantidad = 1; 

    //this.articuloModal = JSON.parse(JSON.stringify(this.articuloModal));
  }




  agregarDetalleModal(){

    this.verificaExiste(this.articuloModal.codigo);
    if(this.valExiste==0){
        this.arrayDetalle.push({
          idarticulo: this.articuloModal.idarticulo,
          codarticle: this.articuloModal.codigo,
          article:    this.articuloModal.nombre,
          cantidad:   this.articuloModal.cantidad,
          precio_venta:     this.articuloModal.precio_venta,
          iva:        this.articuloModal.iva,
          descuento: 0
        });
        // console.log("agregarDetalleModal");   // console.log(this.arrayDetalle);
        this.encerar();
    }else{

            ///Modal sweet alert/////      
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Article ya agregado!',
            //   text: 'verifique y vuelva a intentar'
            // })
            ///Fin modal sweet alert/////      
    }
  }


  onSubmit(ventaForm){

    if(this.venta.tipo_comprobante == 0){
      console.log("Elija tipo comprobante");
      return;
    }

    let newDate = new Date();
    this.venta.fecha = newDate;

    this.venta.subtotal   = this.subtotal;
    this.venta.descuento = this.descuentoTotal;
    this.venta.impuesto0   = this.impuesto0;
    this.venta.impuesto12   = this.impuesto12;
    this.venta.total   = this.subtotal - this.descuentoTotal+ this.impuesto12;
    this.venta.detalles   = this.arrayDetalle;

    console.log(this.venta);

    this._ventaService.saveVenta(this.venta).subscribe(
      response =>{

        this._router.navigate(['/venta']);
        ventaForm.reset();
      },
      error =>{
        console.log(error);
      }
    );
  }


}
