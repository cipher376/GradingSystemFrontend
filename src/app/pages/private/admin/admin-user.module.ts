import { UserToRoleComponent } from './../../../ui-components/user-to-role/user-to-role.component';
import { SelectModule } from 'ng-select';
// import { CompanyModule } from './../company/company.module';
// import { UsersModule } from './../Users/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { CreateAdminUserComponent } from './create-admin-user/create-admin-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { CreateRoleComponent } from './create-role/create-role.component';
// import { AdminToRoleComponent } from './admin-to-role/admin-to-role.component';
// import { AuthGuardService } from '../../../shared/services/guards/auth-guard.service';
// import { ComponentModule } from '../../../shared/components/component.module';
// import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ManageRoleComponent } from './manage-role/manage-role.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentModule } from 'src/app/ui-components/component.module';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { CreatePolicyComponent } from './create-policy/create-policy.component';
import { CreateRolePolicyComponent } from './create-role-policy/create-role-policy.component';
import { RolePolicyListComponent } from './role-policy-list/role-policy-list.component';
// import { SuperAdminGuardService } from '../../../shared/services/guards/superadmin-guard.service';
// import { ManageStoreManagersComponent } from './manage-store-managers/manage-store-managers.component';
// import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
// import { ManageSellersComponent } from './manage-sellers/manage-sellers.component';
// import { ManageCompanyManagersComponent } from './manage-company-managers/manage-company-managers.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin Users'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin-users-list'
      },

      {
        path: 'manage-role',
        component: ManageRoleComponent,
        data: {
          title: 'Manage Role'
        }
      },
      {
        path: 'user-to-roles',
        component: UserToRoleComponent,
        data: {
          title: 'Assign user to role'
        }
      },

      // {
      //   path: 'admin-users-list',
      //   component: AdminUsersListComponent,
      //   data: {
      //     title: 'List all admin users'
      //   }
      // }
    ]
  }
];


@NgModule({
  declarations: [
    CreateAdminUserComponent,
    ManageRoleComponent,
    CreatePolicyComponent,
    CreateRolePolicyComponent,
    RolePolicyListComponent,
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
    SelectModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class AdminUserModule { }
