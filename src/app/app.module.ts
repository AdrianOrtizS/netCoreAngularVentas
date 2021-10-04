import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleNewComponent } from './components/article/article-new/article-new.component';
import { ArticleUpdateComponent } from './components/article/article-update/article-update.component';
import { ArticleShowComponent } from './components/article/article-show/article-show.component';

import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientNewComponent } from './components/client/client-new/client-new.component';
import { ClientShowComponent } from './components/client/client-show/client-show.component';
import { ClientUpdatComponent } from './components/client/client-updat/client-updat.component';

import { ProviderListComponent } from './components/provider/provider-list/provider-list.component';
import { ProviderNewComponent } from './components/provider/provider-new/provider-new.component';
import { ProviderShowComponent } from './components/provider/provider-show/provider-show.component';
import { ProviderUpdateComponent } from './components/provider/provider-update/provider-update.component';

import { ErrorComponent } from './components/other/error/error.component';
import { RolListComponent } from './components/user/rol-list/rol-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserShowComponent } from './components/user/user-show/user-show.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { HomeComponent } from './components/other/home/home.component';


import { UserService } from './services/user.service';

import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
export function tokenGetter(){
  return localStorage.getItem("jwt");
}

import { global }  from 'src/app/services/global';
import { UserLogEditComponent } from './components/user/user-log-edit/user-log-edit.component';
import { IngresoNewComponent } from './components/ingreso/ingreso-new/ingreso-new.component';
import { IngresoListComponent } from './components/ingreso/ingreso-list/ingreso-list.component';
import { ConfigNewComponent } from './components/other/config/config-new/config-new.component';
import { ConfigListComponent } from './components/other/config/config-list/config-list.component';
import { ConfigUpdateComponent } from './components/other/config/config-update/config-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IngresoShowComponent } from './components/ingreso/ingreso-show/ingreso-show.component';
import { NotificationComponent } from './components/other/notification/notification.component';
import { VentaShowComponent } from './components/venta/venta-show/venta-show.component';
import { VentaNewComponent } from './components/venta/venta-new/venta-new.component';
import { VentaListComponent } from './components/venta/venta-list/venta-list.component';
import { TipoArticleListComponent } from './components/tipoArticle/tipo-article-list/tipo-article-list.component';
import { TipoArticleNewComponent } from './components/tipoArticle/tipo-article-new/tipo-article-new.component';
import { TipoArticleShowComponent } from './components/tipoArticle/tipo-article-show/tipo-article-show.component';
import { TipoArticleUpdateComponent } from './components/tipoArticle/tipo-article-update/tipo-article-update.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ErrorComponent,
    ArticleListComponent,
    ArticleNewComponent,
    ArticleUpdateComponent,
    ArticleShowComponent,
    ClientListComponent,
    ClientNewComponent,
    ClientShowComponent,
    ClientUpdatComponent,
    ProviderListComponent,
    ProviderNewComponent,
    ProviderShowComponent,
    ProviderUpdateComponent,
    RolListComponent,
    UserListComponent,
    UserUpdateComponent,
    UserShowComponent,
    UserNewComponent,
    UserLoginComponent,
    HomeComponent,
    UserLogEditComponent,
    IngresoNewComponent,
    IngresoListComponent,
    ConfigNewComponent,
    ConfigListComponent,
    ConfigUpdateComponent,
    IngresoShowComponent,
    NotificationComponent,
    VentaShowComponent,
    VentaNewComponent,
    VentaListComponent,
    TipoArticleListComponent,
    TipoArticleNewComponent,
    TipoArticleShowComponent,
    TipoArticleUpdateComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularFileUploaderModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: [global.url],
        disallowedRoutes:[]
      }
    }),
    NgbModule,

  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
