import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { ConfirmationSentComponent } from './confirmation-sent/confirmation-sent.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
// import { LockComponent } from './lock/lock.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'lock',
    component: LoginComponent,
    data: {
      title: 'Lock'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  {
    path: 'confirmation-sent',
    component: ConfirmationSentComponent,
    data: {
      title: 'Confirmation Sent'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    data: {
      title: 'Update Password'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
