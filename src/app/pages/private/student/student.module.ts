import { ApplicationComponent } from './application/application.component';
import { ComponentModule } from 'src/app/ui-components/component.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { StudentRoutingModule } from './dashboard-routing.module';
import { CreatePreviousSchoolComponent } from './create-previous-school/create-previous-school.component';
import { SelectModule } from 'ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    StudentRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SelectModule,
    ReactiveFormsModule,
    TabsModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    ApplicationComponent,
    CreatePreviousSchoolComponent
  ]
})
export class StudentModule { }
