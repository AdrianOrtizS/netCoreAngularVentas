import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { global } from 'src/app/services/global';
import { error } from 'protractor';

@Component({
  selector: 'app-user-log-edit',
  templateUrl: './user-log-edit.component.html',
  styleUrls: ['./user-log-edit.component.css'],
  providers:[
    UserService
  ]
})
export class UserLogEditComponent implements OnInit {

  public page_title:string;
  public resetVar;
  rols = [];
  public user;
  public identity;
  public token;
  public status;
  public url;


  constructor(
    private _userService: UserService
  ) { 
    this.user = new User(1,'','','','','','','','','','');

    this.token = this._userService.getToken();
    this.identity = localStorage.getItem("identity");

    this.identity = JSON.parse(this.identity);

    this.url = global.url;

    //rellenar objeto usuario
    this.user = new Object();

    this.user.idusuario = this.identity.idusuario;
    this.user.idrol = this.identity.idrol;
    this.user.rol = this.identity.rol;
    this.user.nombre = this.identity.nombre;
    this.user.tipo_documento = this.identity.tipo_documento;
    this.user.num_documento = this.identity.num_documento;
    this.user.direccion = this.identity.direccion;
    this.user.telefono = this.identity.telefono;
    this.user.email = this.identity.email;
    
    this.user.foto = this.identity.foto;
    

  }

  ngOnInit(): void {
    
  }


  onSubmit(userForm){

    this._userService.updateUser( this.user).subscribe(
      response =>{
       
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

      },
      error =>{
        
        console.log(error);
      }
    );

  }


  imageUpload(data){

    console.log(data);

    try {
      let image_data = JSON.parse(data.response);
      this.user.foto = image_data.fileName;
        
    } catch (error) {

      console.log(error);
    }
  
  
  }



  public afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg, .png, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'/Usuarios/Upload',
      headers: {
        // "Authorization" : ""
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Selecciona imagen',
    replaceTexts: {
      selectFileBtn: 'Seleccione foto',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Foto registrada  !',
      afterUploadMsg_error: 'Fallo al subir foto !'
    }
  };


}
