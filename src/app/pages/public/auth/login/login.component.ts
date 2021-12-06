import { SignalService } from 'src/app/shared/services/signal.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../shared/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from '../../../../shared/services/my-auth.service';
import { UserService } from '../../../../shared/services/user.service';
import { MyLocalStorageService } from '../../../../shared/services/local-storage.service';
import { Urls } from '../../../../config';
import { Credentials, User } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _loginForm: FormGroup;
  _user: User;

  _isName = false;
  _isEmail = false;
  _isPhone = false;
  _isPassword = false;
  // _isLogin = false;

  _browserOption = 'location=yes,hidden=no,clearcache=yes,clearsessioncache=yes,hardwareback=yes,hidenavigationbuttons=yes,hideurlbar=no';
  _socialToken: any;

  authenticating = false; // control loader

  constructor(
    private _toaster: ToastrService,
    private _auth: MyAuthService,
    private _userService: UserService,
    private _localStore: MyLocalStorageService,
    private _router: Router,
    private _fb: FormBuilder,
    private adminService: AdminService,
    private signal: SignalService
  ) {
    this._user = new User();
    this._loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(100)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5), Validators.maxLength(100)
        ]
      ],
      remember: [false]
    });
  }

  ngOnInit() {
    this.signal.loaderBlockingSource$.subscribe(action => {
      this.authenticating = action; // remove loader
    })
  }


  async onLogin() {
    // console.log(this._loginForm);
    this.authenticating = true;
    if (!this._loginForm.valid) {
      this._toaster.error('Provide valid credentials');
      console.log(this._loginForm)
      this.authenticating = false;
      return;
    }
    this._auth.login(this._loginForm.value).subscribe(
      res => {
        console.log(res)
        this.signal.setLoaderBlocking(false);// remove loader
        this.adminService.setHomeUrl();
        this._router.navigateByUrl(Urls.home);
      },
      error => {
        console.log(error);
        this.authenticating = false;
        if (error.search('verified') > -1) {
          alert(`Email is not verified. A verification link is sent to the email provided
          but it may take up 10min to show up. check spam if not in your In-box`);
        } else {
          this._toaster.error('Check Credentials | Network');
        }
      }
    );
  }


  onValidate(value: string) {
    // console.log(value);
    switch (value) {
      case 'email':
        this._isEmail = true;
        break;
      case 'phone':
        this._isPhone = true;
        break;
      case 'password':
        this._isPassword = true;
        break;
    }
  }

  // async redirectUserToPage() {
  //   this._auth.isAuthenticated(); // broadcast login successful
  //   this._localStore.set('is_login', true).then(_ => { });
  //   if (this._user?.employee?.id) {
  //     console.log(this._user);
  //     // if social update the current user object
  //     window.location.href = window.location.protocol + '//' + window.location.host + '/#' + Urls.home;
  //   } else {
  //     this._toaster.error('Your account ID cannot be verified. Contact the administrator for help.')
  //   }

  // }

  gotoForgotPassword() {
    // this._router.navigateByUrl('/auth/forgot-password');
  }

  gotoRegister() {
    this._router.navigateByUrl('/auth/register');
  }

}
