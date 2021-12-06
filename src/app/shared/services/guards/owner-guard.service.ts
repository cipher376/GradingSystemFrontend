import { User } from '../../../models/user';
import { UserService } from '../user.service';

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { MyAuthService } from '../my-auth.service';
import { AdminService, USER_ROLE } from '../admin.service';
import { Observable } from 'rxjs';
import { Urls } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuardService implements CanActivate, CanActivateChild, CanLoad {
  isOwner = false;
  loggedUser?: User;
  selectedUser?: User;

  constructor(public _auth: MyAuthService,
    private _router: Router,
    // private _adminService: AdminService,
    private userSrvice: UserService) {
      this.loggedUser = this.userSrvice.getLoggedUserLocalSync();
      this.selectedUser = this.userSrvice.getSelectedUserLocalSync();
      this.isOwner =  (this.loggedUser?.id === this.selectedUser?.id);
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.isOwner;
  }


  canActivate() {
    if (this.isOwner) {
      console.log('Accountant user');
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }


  canActivateChild() {
    if (this.isOwner) {
      console.log('Accountant child navigation');
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }


}
