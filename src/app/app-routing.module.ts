import { UserGuard } from './shared/services/guards/user-guards.service';
import { SuperAdminGuardService } from './shared/services/guards/superadmin-guard.service';
import { AuthGuardService } from './shared/services/guards/auth-guard.service';
import { LoginComponent } from './pages/public/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './pages/public/error/404.component';
import { P500Component } from './pages/public/error/500.component';
import { Urls } from './config';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Authentication'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/public/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'not-found',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'error',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    canActivate: [AuthGuardService],
    canActivateChild: [],
    canLoad: [],
    path: 'app',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'catalog',
      //   loadChildren: () => import('./views/catalog/catalog.module').then(m => m.CatalogModule)
      // },
      // {
      //   path: 'sales',
      //   loadChildren: () => import('./views/sales/sales.module').then(m => m.SalesModule)
      // },
      {
        path: '',
        redirectTo: Urls.home,
        pathMatch: 'full',
      },
      {
        canActivate: [],
        canActivateChild: [],
        canLoad: [],
        path: 'dashboard',
        loadChildren: () => import('./pages/private/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        canActivate: [SuperAdminGuardService],
        canActivateChild: [],
        canLoad: [],
        path: 'admin-users',
        loadChildren: () => import('./pages/private/admin/admin-user.module').then(m => m.AdminUserModule)
      },
      {
        canActivate: [UserGuard],
        canActivateChild: [],
        path: 'users',
        loadChildren: () => import('./pages/private/Users/user.module').then(m => m.UsersModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
