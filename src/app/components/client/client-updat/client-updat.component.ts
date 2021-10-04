import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { global }  from 'src/app/services/global';

@Component({
  selector: 'app-client-updat',
  templateUrl: './client-updat.component.html',
  styleUrls: ['./client-updat.component.css'],
  providers: [
    ClientService
  ]
})
export class ClientUpdatComponent implements OnInit {

  page_title;
  client;
  url;

  list =[];


  constructor(
    private _clientService : ClientService,
    private _router : Router,
    private _route: ActivatedRoute

  ) {
    this.page_title = "EDITAR CLIENTE";
    this.client = new Client(1,'','',0,'','','','');
    this.url = global.url;
    this.list =[
          {'id': 1, 'value':'Cedula'},
          {'id': 2, 'value':'Ruc'},
          {'id': 3, 'value':'Pasaporte'}
        ];
  }


  ngOnInit(): void {
    //document.getElementById("tipo_documento").focus();
    this.getClient();
  }



  getClient(){
    this._route.params.subscribe(
      params =>{
        let id = params['id'];
        this._clientService.getClient(id).subscribe(
          response =>{
            this.client = response;
           // console.log(this.client);
          },error =>{
            console.log(error);
          }
        );

      }
    );
  }


  onSubmit(clientForm){

    if(this.client.tipo_documento == 0){
      console.log("Elija tipo documento");
      return;
    }


    this.client.tipo_persona = "Cliente";

    this._clientService.updateClient(this.client).subscribe(
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
