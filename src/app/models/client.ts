

export class Client{
    constructor(
        public idpersona: number,
        public tipo_persona: string,
        public nombre: string,
        public tipo_documento: any,
        public num_documento: string,
        public direccion: string,
        public telefono: string,
        public email: any
    ){
    }
}