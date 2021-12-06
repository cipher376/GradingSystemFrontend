// import { Urls } from './../../../../config';
// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MyUser } from '../../../../shared/identity-sdk';
// import { ToasterService } from '../../../../shared/services/toaster.service';
// import { MyAuthService } from '../../../../shared/services/my-auth.service';
// import { UserService } from '../../../../shared/services/user.service';
// import { MyLocalStorageService } from '../../../../shared/services/local-storage.service';
// import { UtilityService } from '../../../../shared/services/utility.service';
// import { RoutingStateService } from '../../../../shared/services/routing-state.service';
// import { timeInterval } from 'rxjs/operators';

// @Component({
//   selector: 'app-lock',
//   templateUrl: './lock.component.html',
//   styleUrls: ['./lock.component.scss']
// })
// export class LockComponent implements OnInit, AfterViewInit {

//   _loginForm: FormGroup;
//   _user: MyUser;

//   code: number;
//   counter = 5; // secs
//   stored_code: number;

//   constructor(
//     private _toaster: ToasterService,
//     private _auth: MyAuthService,
//     private _userService: UserService,
//     private _localStore: MyLocalStorageService,
//     private _router: Router,
//     private _util: UtilityService,
//     private _routingState: RoutingStateService
//   ) {
//   }

//   ngOnInit() {
//   }

//   async  ngAfterViewInit() {
//     if (!await this._util.isScreenLocked()) {
//       this.stored_code = this._util.lockScreen();
//       this.code = this.stored_code;
//     }
//     this.showCode();
//   }

//   showCode() {
//     const intervalHandler = setInterval(() => {
//       this.counter -= 1;
//       if (this.counter <= 0) {
//         this.stored_code = null;
//         this.code = null;
//         clearInterval(intervalHandler);
//       }
//     }, 1000);
//   }

//   unlock() {
//     if (this.code) {
//       this._util.unlockScreen(this.code).then(unlocked => {
//         if (unlocked) {
//           this._router.navigateByUrl(this._routingState.getPreviousUrl());
//         }
//       });
//     }
//   }

//   login() {
//     this._router.navigateByUrl(Urls.login);
//   }

// }