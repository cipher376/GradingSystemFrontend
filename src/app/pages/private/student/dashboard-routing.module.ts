import { ApplicationComponent } from './application/application.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Application'
    },
    children: [
      {
        path: '',
        redirectTo: 'form'
      },

      {
        path: 'form',
        component: ApplicationComponent,
        data: {
          title: 'Application form'
        }
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class StudentRoutingModule { }
