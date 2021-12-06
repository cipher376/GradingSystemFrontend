
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Urls } from '../../../config';
import { MyAuthService } from '../my-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(public _auth: MyAuthService, private _router: Router) { }


  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this._auth.isAuthenticated();
  }

  canActivate(): boolean {
    const isAuth = this._auth.isAuthenticated();
    console.log(isAuth);
    if (isAuth) {
      // console.log('Authenticated user');
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


  canActivateChild(): boolean {
    if (this._auth.isAuthenticated()) {
      // console.log('Authenticated user');
      return true;
    } else {
      // console.log('Not Authenticated user');
      // alert("hello1");
      // if its login dont reload
      console.log("You must logged into the system")
      if (this._router.url.indexOf('login') < 0) {
        this._router.navigateByUrl('/auth/login');
      }
      return false;
    }
  }
}
