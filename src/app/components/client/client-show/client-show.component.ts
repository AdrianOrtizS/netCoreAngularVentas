import { Component, OnInit } from '@angular/core';
import { Client } from './../../../models/client';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ClientService } from './../../../services/client.service';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrls: ['./client-show.component.css'],
  providers:[
    ClientService
  ]
})
export class ClientShowComponent implements OnInit {

  public url;
  public page_title;
  public client ;


  constructor(
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "CLIENTE";
    this.url = global.url;
    this.client = new Object;
  }


  ngOnInit(): void {
    
    this.getClient();
//    setTimeout(myFunction, 5000);
            
  }


  getClient(){
    this._route.params.subscribe(params => {
      let id = params['id'];
  
        this._clientService.getClient(id).subscribe(
          response =>{
            //setTimeout(myFunction, 5000);
            this.client = response;
           // console.log(this.client);
  
          },
          error =>{
            this._router.navigate(['inicio']);
          }
        );
    });
  }
}
