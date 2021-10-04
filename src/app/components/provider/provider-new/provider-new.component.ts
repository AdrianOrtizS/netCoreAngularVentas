import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { global }  from 'src/app/services/global';
import { Provider } from './../../../models/provider';

@Component({
  selector: 'app-provider-new',
  templateUrl: './provider-new.component.html',
  styleUrls: ['./provider-new.component.css'],
  providers: [
    ProviderService
  ]
})
export class ProviderNewComponent implements OnInit {

  page_title;
  provider;
  url;

  list =[];


  constructor(
    private _providerService : ProviderService,
    private _router : Router
  ) {
    this.page_title = "NUEVO PROVEEDOR";
    this.provider = new Provider(1,'','',0,'','','','');
    this.url = global.url;
    this.list =[
          {'id': 1, 'value':'Cedula'},
          {'id': 2, 'value':'Ruc'},
          {'id': 3, 'value':'Pasaporte'}
        ];
  }


  ngOnInit(): void {
    document.getElementById("tipo_documento").focus();
  }


  onSubmit(providerForm){

    if(this.provider.tipo_documento == 0){
      console.log("Elija tipo documento");
      return;
    }


    this.provider.tipo_persona = "Proveedor";

    this._providerService.saveProvider(this.provider).subscribe(
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
