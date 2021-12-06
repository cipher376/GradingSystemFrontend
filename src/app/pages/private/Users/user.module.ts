import { EditUserGuard, ListUserGuard, ViewUserGuard } from './../../../shared/services/guards/user-guards.service';
import { UserDetailComponent } from './../../../ui-components/user-detail/user-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponentModule } from 'src/app/ui-components/component.module';
import { CreateAdminUserComponent } from '../admin/create-admin-user/create-admin-user.component';
import { SuperAdminGuardService } from 'src/app/shared/services/guards/superadmin-guard.service';
import { P404Component } from '../../public/error/404.component';


const routes: Routes = [
  {
    canActivate: [],
    canActivateChild: [],
    path: '',
    data: {
      title: ' Users'
    },
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        canActivate: [ListUserGuard],
        path: 'all',
        component: UsersComponent,
        data: {
          title: 'List'
        }
      },
      {
        canActivate: [SuperAdminGuardService],
        path: 'create-user',
        component: CreateAdminUserComponent,
        data: {
          title: 'Create user'
        }
      },
      {
        canActivate: [EditUserGuard],
        path: 'user-edit',
        component: UserEditComponent,
        data: {
          title: 'Edit'
        }
      },
      {
        canActivate: [ViewUserGuard],
        path: 'user-details',
        component: UserDetailComponent,
        data: {
          title: 'details'
        }
      }
    ]
  },
  { path: '**', component: P404Component }
];


@NgModule({
  declarations: [UsersComponent, UserEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes
    ),
    ComponentModule,
    TabsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [RouterModule,
  ],
  providers: [
    EditUserGuard
  ]
})
export class UsersModule { }
