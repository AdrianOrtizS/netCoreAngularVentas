import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from 'src/app/models/config';
import { ConfigService } from 'src/app/services/config.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-config-update',
  templateUrl: './config-update.component.html',
  styleUrls: ['./config-update.component.css'],
  providers: [
    ConfigService
  ]
})
export class ConfigUpdateComponent implements OnInit {

  page_title;
  config;
  url;

  list =[];


  constructor(
    private _configService : ConfigService,
    private _router : Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = "EDITAR CONFIGURACION";
    this.config = new Config(1,'','');
    this.url = global.url;
    
  }


  ngOnInit(): void {
    //document.getElementById("tipo_documento").focus();
    this.getConfiguration();
  }



  getConfiguration(){
    this._route.params.subscribe(
      params =>{
        let id = params['id'];
        this._configService.getConfiguration(id).subscribe(
          response =>{
            this.config = response;
           // console.log(this.client);
          },error =>{
            console.log(error);
          }
        );

      }
    );
  }


  onSubmit(configForm){

    this._configService.updateConfiguration(this.config).subscribe(
      response =>{
        this._router.navigate(['/configuration']);
        configForm.reset();

      },
      error =>{
        console.log(error);
      }
    );
  }


}
