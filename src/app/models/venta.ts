
import { DetalleVenta } from './detalleventa';

export class Venta{
    constructor(
        public idventa: number,
        public idcliente: number,
        public idusuario: number,
        public tipo_comprobante: string,
        public num_comprobante: any,
        public serie_comprobante: string,
        public fecha: Date,
        public impuesto12: any,
        public impuesto0: any,
        
        public subtotal: any,
        public descuento: any,
        public total: any,
        public estado: string,

    
        public detalles: Array<DetalleVenta>       


    ){
    }
}