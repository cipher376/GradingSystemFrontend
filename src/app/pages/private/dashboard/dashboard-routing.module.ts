
import { SuperAdminGuardService } from './../../../shared/services/guards/superadmin-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountantDashboardComponent } from './accountant-dashboard/accountant-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { CustomerAssistantGuardService } from 'src/app/shared/services/guards/customer-assistant-guard.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin-dashboard'
      },

      {
        canActivate: [SuperAdminGuardService],
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        data: {
          title: 'Admin dashboard'
        }
      },
      {
        canActivate: [],
        path: 'manager-dashboard',
        component: ManagerDashboardComponent,
        data: {
          title: 'Manager dashboard'
        }
      },
      {
        canActivate: [],
        path: 'seller-dashboard',
        component: SellerDashboardComponent,
        data: {
          title: 'Seller dashboard'
        }
      },
      {
        canActivate: [CustomerAssistantGuardService],
        path: 'customer-service-dashboard',
        component: SellerDashboardComponent,
        data: {
          title: 'Customer service'
        }
      },
      {
        canActivate: [],
        path: 'accountant-dashboard',
        component: AccountantDashboardComponent,
        data: {
          title: 'Accountant dashboard'
        }
      },
      {
        canActivate: [],
        path: 'Employee-dashboard',
        component: SellerDashboardComponent,
        data: {
          title: 'Employee dashboard'
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CustomerAssistantGuardService
  ]
})
export class DashboardRoutingModule { }
