import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global }  from 'src/app/services/global';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
  providers:[
    UserService
  ]
})
export class UserNewComponent implements OnInit {

  resetVar;

  page_title;
  user;
  rols = [];
  url;

  list =[];

  constructor(
    private _userService : UserService,
    private _router : Router
  ) {
    this.page_title = "NUEVO USUARIO";
    this.user = new User(1,0,'',0,'','','','','','','');
    this.url = global.url;
    this.list =[
      {'id': 1, 'value':'Cedula'},
      {'id': 2, 'value':'Ruc'},
      {'id': 3, 'value':'Pasaporte'}
    ];
  }

  loadRole(){
    this._userService.getRols().subscribe(
      response =>{
        this.rols = response;

      },
      error =>{
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
    document.getElementById("rol").focus();
    this.loadRole();
  }

  
  

  onSubmit(userForm){
    if(this.user.idrol == 0){
      alert("seleccione rol");
      document.getElementById("rol").focus();
    }


    if(this.user.tipo_documento == 0){
      console.log("Elija tipo documento");
      return;
    }

    this.user.password = this.user.num_documento;

    this._userService.save(this.user).subscribe(
      response =>{
        this._router.navigate(['/user']);
        userForm.reset();
      },
      error =>{
        console.log(error);
      }
    );
  }




  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.user.foto = image_data.fileName;
    console.log(this.user);
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
