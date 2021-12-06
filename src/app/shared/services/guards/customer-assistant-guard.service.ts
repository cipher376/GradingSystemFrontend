
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { MyAuthService } from '../my-auth.service';
import { AdminService, USER_ROLE } from '../admin.service';
import { Observable } from 'rxjs';
import { Urls } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class CustomerAssistantGuardService implements CanActivate, CanActivateChild, CanLoad {
  isAdmin = false;
  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _adminService: AdminService) {
  }

  async canLoad(route: Route, segments: UrlSegment[]) {
    return this._adminService.loggedUserHasRole(USER_ROLE.ADMIN);
  }


  async canActivate() {
    if (this._adminService.loggedUserHasRole(USER_ROLE.ADMIN)) {
      console.log('Customer assistant');
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }


  async canActivateChild() {
    if (this._adminService.loggedUserHasRole(USER_ROLE.ADMIN)) {
      console.log('Customer assistant child navigation');
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }
}
