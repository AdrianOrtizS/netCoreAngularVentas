
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ErrorComponent } from './components/other/error/error.component';
import { HomeComponent } from './components/other/home/home.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleNewComponent } from './components/article/article-new/article-new.component';
import { ArticleShowComponent } from './components/article/article-show/article-show.component';
import { ArticleUpdateComponent } from './components/article/article-update/article-update.component';

import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientNewComponent } from './components/client/client-new/client-new.component';
import { ClientShowComponent } from './components/client/client-show/client-show.component';
import { ClientUpdatComponent } from './components/client/client-updat/client-updat.component';

import { ProviderListComponent } from './components/provider/provider-list/provider-list.component';
import { ProviderNewComponent } from './components/provider/provider-new/provider-new.component';
import { ProviderShowComponent } from './components/provider/provider-show/provider-show.component';
import { ProviderUpdateComponent } from './components/provider/provider-update/provider-update.component';

import { RolListComponent } from './components/user/rol-list/rol-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserShowComponent } from './components/user/user-show/user-show.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { Role } from './models/rol';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
//import { AppComponent } from './app.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { UserLogEditComponent } from './components/user/user-log-edit/user-log-edit.component';
import { IngresoNewComponent } from './components/ingreso/ingreso-new/ingreso-new.component';
import { IngresoListComponent } from './components/ingreso/ingreso-list/ingreso-list.component';

import { ConfigListComponent } from './components/other/config/config-list/config-list.component';
import { ConfigNewComponent } from './components/other/config/config-new/config-new.component';
import { ConfigUpdateComponent } from './components/other/config/config-update/config-update.component';
import { IngresoShowComponent } from './components/ingreso/ingreso-show/ingreso-show.component';

import { VentaShowComponent } from './components/venta/venta-show/venta-show.component';
import { VentaNewComponent } from './components/venta/venta-new/venta-new.component';
import { VentaListComponent } from './components/venta/venta-list/venta-list.component';
import { TipoArticleListComponent } from './components/tipoArticle/tipo-article-list/tipo-article-list.component';
import { TipoArticleNewComponent } from './components/tipoArticle/tipo-article-new/tipo-article-new.component';
import { TipoArticleShowComponent } from './components/tipoArticle/tipo-article-show/tipo-article-show.component';
import { TipoArticleUpdateComponent } from './components/tipoArticle/tipo-article-update/tipo-article-update.component';


//DEFINIR RUTAS
const appRoutes: Routes = [

    { path: '',       component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'home',       component: HomeComponent  , canActivate: [AuthGuard]},
    

    { path: 'category',       component: CategoryListComponent , canActivate: [AuthGuard] },
    { path: 'article',       component: ArticleListComponent  , canActivate: [AuthGuard]},
    { path: 'article-new',       component: ArticleNewComponent , canActivate: [AuthGuard] },
    { path: 'article-show/:id',       component: ArticleShowComponent , canActivate: [AuthGuard] },
    { path: 'article-update/:id',       component: ArticleUpdateComponent , canActivate: [AuthGuard] },

    
    { path: 'tipoArticle',       component: TipoArticleListComponent  },
    { path: 'tipoArticle-new',       component: TipoArticleNewComponent  },
    { path: 'tipoArticle-show/:id',       component: TipoArticleShowComponent  },
    { path: 'tipoArticle-update/:id',       component: TipoArticleUpdateComponent  },


    { path: 'client',       component: ClientListComponent  , canActivate: [AuthGuard]},
    { path: 'client-new',       component: ClientNewComponent  , canActivate: [AuthGuard]},
    { path: 'client-show/:id',       component: ClientShowComponent  , canActivate: [AuthGuard]},
    { path: 'client-update/:id',       component: ClientUpdatComponent  , canActivate: [AuthGuard]},

    { path: 'provider',       component: ProviderListComponent  , canActivate: [AuthGuard]},
    { path: 'provider-new',       component: ProviderNewComponent  , canActivate: [AuthGuard]},
    { path: 'provider-show/:id',       component: ProviderShowComponent  , canActivate: [AuthGuard]},
    { path: 'provider-update/:id',       component: ProviderUpdateComponent  , canActivate: [AuthGuard]},


    { path: 'role',       component: RolListComponent  , canActivate: [AuthGuard]},
    { path: 'user',       component: UserListComponent  , canActivate: [AuthGuard]},
    { path: 'user-new',       component: UserNewComponent  },
    { path: 'user-show/:id',       component: UserShowComponent  , canActivate: [AuthGuard]},
    { path: 'user-update/:id',       component: UserUpdateComponent  , canActivate: [AuthGuard]},

    { path: 'userLogEdit',       component: UserLogEditComponent  , canActivate: [AuthGuard]},


    { path: 'login',       component: UserLoginComponent  },



    { path: 'ingreso',       component: IngresoListComponent  , canActivate: [AuthGuard]},
    { path: 'ingreso-new',       component: IngresoNewComponent  , canActivate: [AuthGuard]},
    { path: 'ingreso-show/:id',       component: IngresoShowComponent  },

    
    { path: 'venta',       component: VentaListComponent  , canActivate: [AuthGuard]},
    { path: 'venta-new',       component: VentaNewComponent  , canActivate: [AuthGuard]},
    { path: 'venta-show/:id',       component: VentaShowComponent  },


    { path: 'configuration',       component: ConfigListComponent  , canActivate: [AuthGuard]},
    { path: 'configuration-new',       component: ConfigNewComponent  , canActivate: [AuthGuard]},
    { path: 'configuration-update/:id',       component: ConfigUpdateComponent  , canActivate: [AuthGuard]},

    

    { path: '**',             component: ErrorComponent , canActivate: [AuthGuard]},
  
  ];
  
  //EXPORTAR CONFIGURACION
  export const appRoutingProviders:any[] = [] ;
  export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
  
  