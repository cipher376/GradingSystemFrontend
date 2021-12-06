
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        canActivate: [],
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        data: {
          title: 'Admin dashboard'
        }
      },
      {
        canActivate: [],
        path: 'student-dashboard',
        component: ManagerDashboardComponent,
        data: {
          title: 'Manager dashboard'
        }
      },
      {
        canActivate: [],
        path: 'lecturer-dashboard',
        component: SellerDashboardComponent,
        data: {
          title: 'Seller dashboard'
        }
      },
      {
        canActivate: [],
        path: 'hod-dashboard',
        component: SellerDashboardComponent,
        data: {
          title: 'Customer service'
        }
      }
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
