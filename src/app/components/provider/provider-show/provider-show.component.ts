import { Component, OnInit } from '@angular/core';
import { Provider } from './../../../models/provider';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ProviderService } from './../../../services/provider.service';

@Component({
  selector: 'app-provider-show',
  templateUrl: './provider-show.component.html',
  styleUrls: ['./provider-show.component.css'],
  providers: [
    ProviderService
  ]
})
export class ProviderShowComponent implements OnInit {

  public url;
  public page_title;
  public provider ;


  constructor(
    private _providerService: ProviderService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "PROVEEDOR";
    this.url = global.url;
    this.provider = new Object;
  }


  ngOnInit(): void {
    
    this.getprovider();
//    setTimeout(myFunction, 5000);
            
  }


  getprovider(){
    this._route.params.subscribe(params => {
      let id = params['id'];
  
        this._providerService.getProvider(id).subscribe(
          response =>{
            //setTimeout(myFunction, 5000);
            this.provider = response;
           // console.log(this.provider);
  
          },
          error =>{
            this._router.navigate(['inicio']);
          }
        );
    });
  }
}
