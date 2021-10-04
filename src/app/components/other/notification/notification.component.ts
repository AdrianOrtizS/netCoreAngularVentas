import { Component, OnInit } from '@angular/core';

import { HubConnectionBuilder, HubConnection} from'@aspnet/signalr';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../../services/global';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [
    UserService
  ]
})
export class NotificationComponent implements OnInit {

  public identity;
  public hubConnection: HubConnection;
  public url;
  public messages =[];
  public contMessage;


  constructor(
    public _userService: UserService,
  ) {
      this.url = global.url;

      this.identity = this._userService.getIdentity();
      console.log(this.identity.rol);

          const builder = new HubConnectionBuilder();
          this.hubConnection = builder.withUrl(this.url+"/notify")
                                      .build();

          this.hubConnection.on("ReceiveMessage", (message) =>{
            this.messages.push({
              messa: message
            });

            this.contMessage = this.messages.length;

            console.log(this.messages[0].messa);
            console.log(this.contMessage);


          });

          this.hubConnection.start().then(()=>{
            this.hubConnection.invoke("AddToGroup", this.identity.rol)        
                              .catch(err => console.error(err.toString()));
          }).catch(err => {
            console.error(err.toString());
          });


   }

  ngOnInit(): void {
  }

}
