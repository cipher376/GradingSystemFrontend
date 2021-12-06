import { UserService } from './../user.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { MyAuthService, AdminService, USER_ROLE } from "..";
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _adminService: AdminService,
    private userService: UserService) { }

  async canActivate() {
    if (this._adminService.loggedUserHasRole(USER_ROLE.ADMIN)) {
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }

  isOwner() {
    const loggedUser = this.userService.getLoggedUserLocalSync();
    const selectedUser = this.userService.getSelectedUserLocalSync();
    if ((loggedUser && selectedUser) && (loggedUser?.id == selectedUser?.id)) {
      return true;
    } else {
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard implements CanActivate {

  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _adminService: AdminService,
    private userService: UserService) { }

  async canActivate() {
    if (this._adminService.loggedUserHasRole(USER_ROLE.ADMIN) || this.isOwner()) {
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }

  isOwner() {
    const loggedUser = this.userService.getLoggedUserLocalSync();
    const selectedUser = this.userService.getSelectedUserLocalSync();
    if ((loggedUser && selectedUser) && (loggedUser?.id == selectedUser?.id)) {
      return true;
    } else {
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ViewUserGuard implements CanActivate {

  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _adminService: AdminService,
    private userService: UserService) { }

  async canActivate() {
    if (this._adminService.loggedUserHasRole(USER_ROLE.ADMIN)) {
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }

  isOwner() {
    const loggedUser = this.userService.getLoggedUserLocalSync();
    const selectedUser = this.userService.getSelectedUserLocalSync();
    if ((loggedUser && selectedUser) && (loggedUser?.id == selectedUser?.id)) {
      return true;
    } else {
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ListUserGuard implements CanActivate {

  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _adminService: AdminService,
    private userService: UserService) { }

  async canActivate() {
    if (this._adminService.loggedUserHasRole(USER_ROLE.ADMIN)
      ) {
      return true;
    } else {
      console.log("You don't have permission to perform that action")
      return false;
    }
  }

  isOwner() {
    const loggedUser = this.userService.getLoggedUserLocalSync();
    const selectedUser = this.userService.getSelectedUserLocalSync();
    if ((loggedUser && selectedUser) && (loggedUser?.id == selectedUser?.id)) {
      return true;
    } else {
      return false;
    }
  }
}
