import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Provider } from 'src/app/models/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { global }  from 'src/app/services/global';


@Component({
  selector: 'app-provider-update',
  templateUrl: './provider-update.component.html',
  styleUrls: ['./provider-update.component.css'],
  providers:[
    ProviderService
  ]
})
export class ProviderUpdateComponent implements OnInit {

  page_title;
  provider;
  url;

  list =[];


  constructor(
    private _providerService : ProviderService,
    private _router : Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = "EDITAR PROVEEDOR";
    this.provider = new Provider(1,'','',0,'','','','');
    this.url = global.url;
    this.list =[
          {'id': 1, 'value':'Cedula'},
          {'id': 2, 'value':'Ruc'},
          {'id': 3, 'value':'Pasaporte'}
        ];
  }


  ngOnInit(): void {
    //document.getElementById("tipo_documento").focus();
    this.getProvider();
  }



  getProvider(){
    this._route.params.subscribe(
      params =>{
        let id = params['id'];
        this._providerService.getProvider(id).subscribe(
          response =>{
            this.provider = response;
           // console.log(this.provider);
          },error =>{
            console.log(error);
          }
        );

      }
    );
  }


  onSubmit(providerForm){

    if(this.provider.tipo_documento == 0){
      console.log("Elija tipo documento");
      return;
    }


    this.provider.tipo_persona = "Proveedor";

    this._providerService.updateProvider(this.provider).subscribe(
      response =>{
        this._router.navigate(['/provider']);
        providerForm.reset();

      },
      error =>{
        console.log(error);
      }
    );
  }


}
