import { Component, OnInit } from '@angular/core';
import { global } from './../../../services/global';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/services/ingreso.service';

@Component({
  selector: 'app-ingreso-show',
  templateUrl: './ingreso-show.component.html',
  styleUrls: ['./ingreso-show.component.css'],
  providers:[
    IngresoService
  ]
})
export class IngresoShowComponent implements OnInit {

  public url;
  public page_title;
  public ingreso ;

  public detalles ;


  constructor(
    private _ingresoService: IngresoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "DETALLE INGRESO";
    this.url = global.url;
    this.ingreso = new Object;
//    this.detalleIngreso = Array<DetalleIngreso>();
  }


  ngOnInit(): void {
    
    this.getIngreso();
//    setTimeout(myFunction, 5000);
            
  }


  getIngreso(){
    this._route.params.subscribe(params => {
      let id = params['id'];
  
        this._ingresoService.getIngreso(id).subscribe(
          response =>{
            //setTimeout(myFunction, 5000);
            this.ingreso = response;
            
            this._ingresoService.getDetallesIngreso(id).subscribe(
              response =>{

                this.ingreso.detalles = response;
                this.detalles = this.ingreso.detalles;
                console.log(this.ingreso);
                
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
