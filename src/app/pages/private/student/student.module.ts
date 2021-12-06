import { ApplicationComponent } from './application/application.component';
import { ComponentModule } from 'src/app/ui-components/component.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { StudentRoutingModule } from './dashboard-routing.module';
import { CreatePreviousSchoolComponent } from './create-previous-school/create-previous-school.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    StudentRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [
    ApplicationComponent,
    CreatePreviousSchoolComponent
  ]
})
export class StudentModule { }
