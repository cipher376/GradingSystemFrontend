import { ComponentModule } from 'src/app/ui-components/component.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AccountantDashboardComponent } from './accountant-dashboard/accountant-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [
    SellerDashboardComponent,
    AccountantDashboardComponent,
    ManagerDashboardComponent,
    AdminDashboardComponent ]
})
export class DashboardModule { }
