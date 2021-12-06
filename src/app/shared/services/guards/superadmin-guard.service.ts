
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { MyAuthService } from '../my-auth.service';
import { AdminService, USER_ROLE } from '../admin.service';
import { Observable } from 'rxjs';
import { Urls } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuardService implements CanActivate, CanActivateChild, CanLoad {
  isAdmin = false;
  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _adminService: AdminService) {
      this.isAdmin = this._adminService.loggedUserHasRole(USER_ROLE.ADMIN);
  }

  async canLoad(route: Route, segments: UrlSegment[]) {
    return this.isAdmin;
  }


  async canActivate() {
    if (this.isAdmin) {
      console.log('Super admin user');
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }


  async canActivateChild() {
    if (this.isAdmin) {
      console.log('super admin child navigation');
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }
}
