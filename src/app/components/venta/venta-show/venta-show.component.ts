import { Component, OnInit } from '@angular/core';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Venta } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-show',
  templateUrl: './venta-show.component.html',
  styleUrls: ['./venta-show.component.css'],
  providers:[
    VentaService
  ]
})
export class VentaShowComponent implements OnInit {

  public url;
  public page_title;
  public venta ;

  public detalles ;


  constructor(
    private _ventaService: VentaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "DETALLE VENTA";
    this.url = global.url;
    this.venta = new Object;
//    this.detalleventa = Array<Detalleventa>();
  }


  ngOnInit(): void {
    
    this.getVenta();
//    setTimeout(myFunction, 5000);
            
  }


  getVenta(){
    this._route.params.subscribe(params => {
      let id = params['id'];
  
        this._ventaService.getVenta(id).subscribe(
          response =>{
            //setTimeout(myFunction, 5000);
            this.venta = response;

            //console.log(this.venta);
            
            this._ventaService.getDetallesVenta(id).subscribe(
              response =>{

                this.venta.detalles = response;
                this.detalles = this.venta.detalles;
                console.log(this.venta);
                
              }
            );
          },
          error =>{
            this._router.navigate(['inicio']);
          }
        );
    });
  }
}
