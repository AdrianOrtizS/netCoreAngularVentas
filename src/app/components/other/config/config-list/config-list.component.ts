import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ConfigService } from './../../../../services/config.service';
import { Config } from './../../../../models/config';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css'],
  providers:[
    ConfigService
  ]
})
export class ConfigListComponent implements OnInit {

public url;
public page_title;
public configs : Array<Config> 
public config ;
public campoBuscar: string;


cantidadTotalRegistros;
paginaActual = 1;
cantidadRegistrosAMostrar = 5; 

//tamaño tabla
tableSizes =[5,10,20,50];



constructor(
  private _configService: ConfigService,
  private _route: ActivatedRoute,
  private _router: Router
) { 
  this.page_title = "CONFIGURACIONES";
  this.url = global.url;
  this.config = new Config(1,'','');
  this.campoBuscar = "nombre";
}

ngOnInit(): void {
  this.getConfig(this.paginaActual, this.cantidadRegistrosAMostrar);
  this.buscarPor();
}

buscarPor() {
  this.campoBuscar;
}

//numero de elementos a mostrar
onTableSizesChanges(event):void{
  this.cantidadRegistrosAMostrar = event.target.value;
  this.paginaActual =1;
  this.getConfig(this.paginaActual, this.cantidadRegistrosAMostrar);
}


getConfig( pagina:number, cantidadRegistrosAMostrar:number){
  
  this.config.descripcion = "";

  this._configService.getConfigurations(pagina, cantidadRegistrosAMostrar).subscribe(
    (response : HttpResponse<any>) =>{
      this.configs = response.body;
      this.cantidadTotalRegistros = response.headers.get("cantidadTotalRegistros");

     // console.log(this.clients);
     
    },
    error =>{
      console.error(error);
    }
  );
}

searchConfig(valor ){
  this._configService.searchConfiguration(valor,this.paginaActual,this.cantidadRegistrosAMostrar).subscribe(
    (response : HttpResponse<any>) =>{
      this.configs = response.body;
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
  this.getConfig(this.paginaActual, this.cantidadRegistrosAMostrar);
}



}
