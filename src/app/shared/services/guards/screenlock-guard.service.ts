
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, UrlSegment } from '@angular/router';
import { Urls } from 'src/app/config';
import { MyAuthService } from '../my-auth.service';
import { UtilityService } from '../utility.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenLockGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(public _auth: MyAuthService,
    private _router: Router,
    private _util: UtilityService) { }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (! await this._util.isScreenLocked()) {
      // console.log('Authenticated user');
      return true;
    } else {
      // console.log('Not Authenticated user');
      if (this._router.url.indexOf('login') < 0) {
        this._router.navigateByUrl(Urls.login);
      }
      return false;
    }

  }
  async canLoad(route: Route, segments: UrlSegment[]) {
    // don't navigate if screen is locked
    if (!await this._util.isScreenLocked()) {
      // console.log('Authenticated user');
      return true;
    } else {
      return false;
    }
  }

  async canActivate(): Promise<boolean> {
    if (!await this._util.isScreenLocked()) {
      console.log('Authenticated user');
      return true;
    } else {
      console.log('Not Authenticated user');
      // alert("hello1");
      // if its login dont reload
      if (this._router.url.indexOf('login') < 0) {
        this._router.navigateByUrl(Urls.login);
      }
      return false;
    }
  }


}
