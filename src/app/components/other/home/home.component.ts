import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service'; 
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[
    VentaService
  ]
})
export class HomeComponent implements OnInit {

  public page_title;
  public mesesValores;
  public productMoreSale;  


  constructor(
    private _ventaService: VentaService
  ) {
    this.page_title ="VENTAS";
   }

  ngOnInit(): void {
    this.getSalesForMonth();
    this.getProductMoreSale();

  }

  getSalesForMonth(){
    this._ventaService.getSalesForMonth().subscribe(
      response =>{
        this.mesesValores = response.body;
       // console.log(this.mesesValores);
        this.loadSalesForMonth();
      },
      error => {
      }
    );
  }


  getProductMoreSale(){
    this._ventaService.getProductMoreSale().subscribe(
      response =>{
        this.productMoreSale = response.body;
        this.loadProductMoreSale();
        //console.log(this.productMoreSale);

      },
      error => {
        console.log(error);
      }
    );
  }


  loadSalesForMonth(){
    let nombresMeses = new Array();
    let totalMeses= new Array();
    let mesn;
  
    this.mesesValores.map(function(x){
      switch(parseInt(x.etiqueta)){
        case 1:
        mesn='Enero';
        break;
        case 2:
        mesn='Febrero';
        break;
        case 3:
        mesn='Marzo';
        break;
        case 4:
        mesn='Abril';
        break;
        case 5:
        mesn='Mayo';
        break;
        case 6:
        mesn='Junio';
        break;
        case 7:
        mesn='Julio';
        break;
        case 8:
        mesn='Agosto';
        break;
        case 9:
        mesn='Septiembre';
        break;
        case 10:
        mesn='Octubre';
        break;
        case 11:
        mesn='Noviembre';
        break;
        case 12:
        mesn='Diciembre';
        break;
        default:
          mesn='Error';
      }

      
      nombresMeses.push(mesn);
      totalMeses.push(x.valor);
    
    });

    //var ctx = document.getElementById('myChart');
    var canvas = <HTMLCanvasElement> document.getElementById("ventas");
    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombresMeses,
        datasets: [{
            label: "Ventas",
            data: totalMeses,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
    });
  }





  loadProductMoreSale(){
    
    let product = new Array();
    let cantidad= new Array();

    this.productMoreSale.map(function(x){
      product.push(x.producto);
      cantidad.push(x.cantidad);
    });

    
    //var ctx = document.getElementById('myChart');
    var canvas = <HTMLCanvasElement> document.getElementById("productMoreSale");
    // canvas.width = 500;
    // canvas.height = 500;

    // canvas.style.width = "50%";
    // canvas.style.height = "50%";

    var ctx = canvas.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      //type: 'line',
      data: {
        labels: product,
        datasets: [{
            label: "Productos mas vendidos",
            data: cantidad,
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)',
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)'
             ],
             borderColor: [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)',
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)'
             ],
            borderWidth: 1
        }]
      },
      options: {
      //  responsive:true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
      }
    });
  }


}
