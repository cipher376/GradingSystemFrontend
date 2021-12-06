import { MY_ACTION, SignalService } from './../../shared/services/signal.service';
import { MyAuthService, UserService } from 'src/app/shared/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User, Credentials } from 'src/app/models';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public regForm: FormGroup = this.fb.group({});

  _isName = false;
  _isEmail = false;
  _isPhone = false;
  _isPassword = false;
  _isMatch = false;

  public selectedUser?: User;
  public credentials: Credentials = new Credentials;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private auth: MyAuthService,
    private signal: SignalService,
    private userService: UserService
  ) {
    this.createRegForm();

  }

  async ngOnInit() {
    this.selectedUser = await this.userService.getSelectedUserLocal()
  }

  async onRegister() {
    if (!this.getData()) {
      this.toaster.error('Information is invalid');
      return;
    }

    this.auth.signUp(this.credentials).subscribe(res => {
      console.log(res);
      this.selectedUser = res as User;

      // set selected user on local disk
      this.userService.setSelectedUserLocal(this.selectedUser);
      if (this.selectedUser?.id) {
        this.toaster.info('Please check your inbox to verify your email');
        // inform other UI components to update
        this.signal.sendAction(MY_ACTION.reloadUser);
      }
    },
      (error: any) => {
        console.log(error);
        if (error.toString().indexOf('in use') > -1) {
          this.toaster.error('Email is already in use!');
        } else if (error.toString().indexOf('verified') > -1) {
          this.toaster.info(`Email is not verified. A verification link is sent to ` +
            this.selectedUser?.email +
            ` but it may take up 3min to show up. check spam if not in your In-box`,
          );
          this.createRegForm();
        } else {
          this.toaster.error('Check Credentials | Network');
        }
      });
  }

  getData() {
    if (this.credentials) {
      this.credentials.firstName = this.regForm?.value.firstName;
      this.credentials.lastName = this.regForm?.value.lastName;
      this.credentials.otherName = this.regForm?.value.otherName ?? '';
      this.credentials.email = this.regForm?.value.reg_email;
      this.credentials.phone = this.regForm?.value.reg_phone;
      this.credentials.password = this.regForm?.value.reg_password;
    }
    if (!this._isPassword) {
      return false;
    }
    if (!this._isPhone) {
      return false;
    }
    if (!this._isMatch) {
      return false;
    }
    return true;
  }

  onValidate(value: string) {
    // console.log(value);
    switch (value) {
      case 'email':
        const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
        if (this.regForm?.value.reg_email?.match(emailRe)) {
          this._isEmail = true;
        } else {
          this._isEmail = false;
        }
        break;
      case 'phone':
        const re1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const re2 = /^\d{10}$/;
        const re3 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        const re4 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (this.regForm?.value?.reg_phone?.match(re1) ||
          this.regForm?.value?.reg_phone?.match(re2) ||
          this.regForm?.value?.reg_phone?.match(re3) ||
          this.regForm?.value?.reg_phone?.match(re4)) {
          this._isPhone = true;
          console.log(true);
        } else {
          this._isPhone = false;
        }
        break;
      case 'password':
        // test strength
        const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        if (this.regForm?.value.reg_password?.match(strongRegex)) {
          this._isPassword = true;
        } else {
          this._isPassword = false;
        }

        if (this.regForm?.value.reg_password === this.regForm?.value.reg_password2) {
          this._isMatch = true;
        } else {
          this._isMatch = false;
        }
        break;
      case 'password2':
        if (this.regForm?.value.reg_password === this.regForm?.value.reg_password2) {
          this._isMatch = true;
        } else {
          this._isMatch = false;
        }
        break;
    }
  }


  createRegForm() {
    this.regForm = this.fb.group({
      firstName: [
        this.credentials.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      lastName: [
        this.credentials.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      otherName: [
        this.credentials.otherName,
        [
          Validators.maxLength(100)
        ]
      ],
      reg_email: [
        this.credentials.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      reg_password: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      reg_password2: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      reg_phone: [
        this.credentials.phone,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ]
    });
  }

}
