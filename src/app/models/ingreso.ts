

import { DetalleIngreso } from './detalleingreso';

export class Ingreso{
    constructor(
        public idingreso: number,
        public idproveedor: number,
        public idusuario: number,
        public tipo_comprobante: string,
        public num_comprobante: string,
        public serie_comprobante: string,
        public fecha: Date,
        public impuesto12: any,
        public impuesto0: any,
        
        public subtotal: any,
        public total: any,
        public estado: string,

    
        public detalles: Array<DetalleIngreso>       


    ){
    }
}