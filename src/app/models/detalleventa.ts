export class DetalleVenta{
    constructor(
        public iddetalleVenta: number,
        public idventa: number,
        public idarticulo: number,
        public cantidad: number,
        public precio_compra: any

    ){
    }
}