import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css'],
  providers: [
    ClientService
  ]
})
export class ClientNewComponent implements OnInit {


  page_title;
  client;
  url;

  list =[];


  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) {
    this.page_title = "NUEVO CLIENTE";
    this.client = new Client(1,'','',0,'','','','');
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


  onSubmit(clientForm){

    if(this.client.tipo_documento == 0){
      console.log("Elija tipo documento");
      return;
    }


    this.client.tipo_persona = "Cliente";

    this._clientService.saveClient(this.client).subscribe(
      response =>{
        this._router.navigate(['/client']);
        clientForm.reset();

      },
      error =>{
        console.log(error);
      }
    );
  }


}
