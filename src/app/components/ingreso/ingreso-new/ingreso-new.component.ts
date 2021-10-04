import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';
import { ProviderService } from 'src/app/services/provider.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { global }  from 'src/app/services/global';
import { Provider } from 'src/app/models/provider';
import { User } from 'src/app/models/user';
import { Article } from 'src/app/models/article';
import { ConfigService } from 'src/app/services/config.service';

import * as moment from 'moment';


@Component({
  selector: 'app-ingreso-new',
  templateUrl: './ingreso-new.component.html',
  styleUrls: ['./ingreso-new.component.css'],
  providers: [
    IngresoService,
    ProviderService,
    ArticleService,
    UserService,
    ConfigService
  ]
})
export class IngresoNewComponent implements OnInit {


  public page_title;
  public url;

  public user;
  public providers : Array<Provider> 
  public provider ;
  public campoBuscar: string;

  public article;
  public articles;
  public articuloModal;
  public arrayDetalle=[];
  public precio_compra2;
  public cantidad2;
  public subtotal;
  public total;
  


  public iva;  // get iva of configuration
  public impuesto0 ;
  public impuesto12;

  
  public valExiste;
  public validararticle;
  public validarprecio_compra;
  public validarcantidad;


  public ingreso;
  
  list =[];
  
  model;

  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5; 

  //tamaño tabla
  tableSizes =[5,10,20,50];

  
  constructor(
    private _ingresoService : IngresoService,
    private _providerService : ProviderService,
    private _articleService : ArticleService,
    private _userService: UserService,
    private _configService: ConfigService,
    private _router : Router

    ) {
    this.page_title = "NUEVO INGRESO";
    this.provider = new Provider(1,'','','','','','','');
    this.article = new Article(1,1,'','',1,1,1,'',true,true,'','','');
    this.ingreso = new Ingreso(1,1,1,'0','','', new Date,0.0,0.0,'','','',[]);
    this.url = global.url;
    this.user = new User(1,1,'','','','','','','','',''); 
    this.user = this._userService.getIdentity();
    this.validararticle  =0;
    this.validarprecio_compra    =0;
    this.validarcantidad  =0;

    this.list =[
      {'id': 1, 'value':'Factura'},
      {'id': 2, 'value':'Recibo'}
    ];

  }



  ngOnInit(): void {
    this.ingreso.idusuario = this.user.idusuario;
    this.getIva();
    this.getArticles( this.paginaActual , this.cantidadRegistrosAMostrar );
  }

  //buscar proveedor Modal
  searchProviderModal($event ){
    $event.preventDefault();
    let providerModal = (<HTMLInputElement>document.getElementById("providerModal")).value;
    this._ingresoService.selectProviders(providerModal).subscribe(
      (response : HttpResponse<any>) =>{
        this.providers = response.body;
      },
      error =>{
        console.error(error+" Error search");
      }
    );
  }


  agregarProviderModal(prov){
    this.provider = prov;
    this.ingreso.idproveedor = this.provider.idproveedor;
    document.getElementById('closeModalProvider').click();
  }



  //buscar Articulo por Codigo
  buscarArticleCodigo(codigo){
    if(codigo.length >= 5){ 
      this._ingresoService.SelectArticlePorCodigo(codigo).subscribe(
        (response : HttpResponse<any>)  =>{
          this.article = response.body;

          //console.log("buscarArticleCodigo");   //console.log(this.article);

           this.precio_compra2 = this.article.precio_compra;
           this.cantidad2 = 1;

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
        console.log(this.articles);
        this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");
      },
      error =>{
        console.error(error);
      }
    );
  }


  

  //Modal Buscar Articulos
  buscarproductonombre(nombre, pagina:number, cantidadElementosAMostrar: number){
    this._ingresoService.selectArticlePorNombre(nombre ,pagina, cantidadElementosAMostrar).subscribe(
      (response : HttpResponse<any>) =>{
      this.articles = response.body;

      // console.log("buscarproductonombre");
      // console.log(this.articles);
      
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
    //preiene recargar la pagina
    event.preventDefault();
    
    //verifica si esta seleccionado article, cantidad , precio
    if(!this.article.codigo){
      this.validararticle=1;
    }else{this.validararticle=0}

    if(!this.precio_compra2){
      this.validarprecio_compra++;
    }else{this.validarprecio_compra=0;}
    
    if(!this.cantidad2){
      this.validarcantidad++;
    }else{this.validarcantidad=0;}

    if(this.validararticle == 0 && this.validarprecio_compra == 0 && this.validarcantidad == 0 && this.article.nombre != "No hay el article"){
      this.verificaExiste(this.article.codigo);
    
        if(this.valExiste == 0){
            
          this.arrayDetalle.push({
            idarticulo: this.article.id,
            codarticle: this.article.codigo,
            article:   this.article.nombre,
            cantidad:   this.cantidad2,
            iva: this.article.iva,
            precio_compra:     this.precio_compra2,

          });

//           console.log(this.arrayDetalle);

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
    this.precio_compra2    ='';
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
    this.impuesto0 = 0.0;
    this.impuesto12 = 0.0;
    this.total = 0.0;
  
    for(var i=0; i < this.arrayDetalle.length; i++)
    {
      //si arrayDetalle.iva==0      iva0 = iva0+
      //si arrayDetalle.iva==1      iva1 = iva1+
      this.subtotal = this.subtotal+(this.arrayDetalle[i].precio_compra*this.arrayDetalle[i].cantidad);

      if(this.arrayDetalle[i].iva == true){
        this.impuesto12 = this.impuesto12 + ((this.arrayDetalle[i].precio_compra*this.arrayDetalle[i].cantidad)*this.iva)/100;
      }

      if(this.arrayDetalle[i].iva == false){
        this.impuesto0 = this.impuesto0 + (this.arrayDetalle[i].precio_compra*this.arrayDetalle[i].cantidad);
      }
    
      this.total =  this.subtotal + this.impuesto12;
    
    }

    // console.log([this.subtotal , this.impuesto0, this.impuesto12, this.total]);


    return [this.subtotal , this.impuesto0, this.impuesto12, this.total];
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

 

  seleccionarArticuloModal(art){
  
    this.articuloModal = new Object;

    this.articuloModal.idarticulo = art.idarticulo; 
    this.articuloModal.codigo = art.codigo; 
    this.articuloModal.nombre = art.nombre; 
    this.articuloModal.precio_compra = art.precio_compra; 
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
          precio_compra:     this.articuloModal.precio_compra,
          iva:        this.articuloModal.iva
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


  onSubmit(ingresoForm){

    if(this.ingreso.tipo_comprobante == 0){
      console.log("Elija tipo comprobante");
      return;
    }

    
    let anio = ''+this.ingreso.fecha['year'];
    let mes = ''+this.ingreso.fecha['month'];
    let dia = ''+this.ingreso.fecha['day'];
    let fecha = anio+'-'+mes+'-'+dia;
    //let dateString = '1968-11-16T00:00:00' 
    let newDate = new Date(fecha);
    this.ingreso.fecha = newDate;

    this.ingreso.subtotal   = this.subtotal;
    this.ingreso.impuesto0   = this.impuesto0;
    this.ingreso.impuesto12   = this.impuesto12;
    this.ingreso.total   = this.subtotal + this.impuesto12;
    this.ingreso.detalles   = this.arrayDetalle;

    console.log(this.ingreso);


    this._ingresoService.saveIngreso(this.ingreso).subscribe(
      response =>{

        this._router.navigate(['/ingreso']);
        ingresoForm.reset();
      },
      error =>{
        console.log(error);
      }
    );

  }



}
