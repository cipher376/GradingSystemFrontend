import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, Credentials } from 'src/app/models';
import { MyAuthService, UserService, MyLocalStorageService, AdminService } from 'src/app/shared/services';
import { SignalService } from 'src/app/shared/services/signal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  cred: Credentials = new Credentials();

  _isName = false;
  _isEmail = false;
  _isPhone = false;
  _isPassword = false;

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
    this.registerForm = this._fb.group({
      fname: [
        '',
        [
          Validators.required
        ]
      ],
      lname: [
        '',
        [
          Validators.required
        ]
      ],
      phone: [
        '',
        [
          Validators.required
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(100)
        ]
      ],
      password1: [
        '',
        [
          Validators.required,
          Validators.minLength(5), Validators.maxLength(100)
        ]
      ],
      password2: [
        '',
        [
          Validators.required,
          Validators.minLength(5), Validators.maxLength(100)
        ]
      ],
    });
  }

  ngOnInit() {
    this.signal.loaderBlockingSource$.subscribe(action => {
      this.authenticating = action; // remove loader
    })
  }

  onRegister() {
    this.authenticating = true;
    if (!this.registerForm.valid) {
      this._toaster.error('Provide valid credentials');
      console.log(this.registerForm.value)
      this.authenticating = false;
      return;
    }

    const cred = new Credentials();
    cred.email = this.registerForm.value.email;
    cred.phone = this.registerForm.value.phone;
    cred.firstName = this.registerForm.value.fname;
    cred.lastName = this.registerForm.value.lname;
    cred.password = this.registerForm.value.password1;
    cred.email = this.registerForm.value.email;

    if(this.registerForm.value.password1 != this.registerForm.value.password2){
      this._toaster.error('Password do not much');
      return;

    }

    this._auth.signUp(cred).subscribe(res => {
      console.log(res);
      this.gotoLogin();
    })
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

  gotoLogin() {
    this._router.navigateByUrl('/auth/login');

  }

}
