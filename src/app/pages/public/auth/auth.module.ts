import { ComponentModule } from 'src/app/ui-components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
// import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ConfirmationSentComponent } from './confirmation-sent/confirmation-sent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { LockComponent } from './lock/lock.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    ConfirmationSentComponent,
    RegisterComponent,
    // LockComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ComponentModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    ConfirmationSentComponent,
    // LockComponent,
    RegisterComponent,

  ]
})
export class AuthModule { }
