import { DecimalPipe } from "@angular/common";



export class Article{
    constructor(
        public idarticulo: number,
        public idcategoria: number,
        public codigo: string,
        public nombre: string,
        public precio_venta: number,
        public precio_compra: number,
        public stock: number,
        public descripcion: string,
        public condicion: boolean,
        public iva: boolean= true,
        public foto: any,
        public utilidad: any,
        public tiposArt:any
    ){
    }
}