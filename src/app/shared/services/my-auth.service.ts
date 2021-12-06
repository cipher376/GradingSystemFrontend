import { SignalService } from 'src/app/shared/services/signal.service';
import { Urls } from './../../config';
import { environment } from './../../../environments/environment';
import { UserService } from 'src/app/shared/services';
import { Credentials } from './../../models/user';
import { Injectable, Inject } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
// import { DateTime } from 'ionic-angular';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, Token } from 'src/app/models';
import { MyLocalStorageService, AdminService, UtilityService } from '.';
import { PageInfo } from 'src/app/models/page';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {


  token?: Token;
  redirectUrl = Urls.home;

  constructor(
    private http: HttpClient,
    private store: MyLocalStorageService,
    private userService: UserService,
    private adminService: AdminService,
    private signal: SignalService,
    private router: Router) {
    this.token = this.getToken();
  }

  static checkOwnerShip(user1: User, user2: User) {
    console.log(user1)
    console.log(user2)
    if (!user1?.id || !user2?.id || (user1?.id !== user2?.id)) {
      console.log('not owner');
      return false;
    } else {
      console.log('is owner');
      return true;
    }
  }

  signUp(user: Credentials) {
    return this.http.post<User>(environment.api_root_url + '/users/signup', user).pipe(
      map(res => {
        // console.log(res);
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  login(data: Credential) {
    console.log(environment.api_root_url)
    return this.http.post<{ token: string, user: User }>(environment.api_root_url + '/login', data).pipe(
      map((res) => {
        this.token = { token: res.token } as any;
        if (this.token?.token) {
          this.saveToken(this.token);
          this.userService.setLoggedUserLocal(res.user);
          console.log(res.user)
          const user = res.user;
          // load user roles
          this.adminService.getUserRolesGrading(res.user?.id).subscribe((roles: string[]) => {
            console.log(roles);

            this.signal.setLoaderBlocking(false);// remove loader
            this.userService.setLoggedUserRolesLocal(roles);
            this.adminService.setHomeUrl();
            this.redirectUrl = Urls.home;
            this.store.remove('lock_code');
            this.router.navigateByUrl(this.redirectUrl);
          });
        }
        return res;
      }),
      catchError(e => this.handleError(e))
    );
  }

  logout() {
    this.deleteToken(); // delete jwt auth token
    this.userService.deleteLoggedUserLocal(); // clear user details
    this.router.navigateByUrl('/login');
  }

  getToken(): Token {
    return this.store.getObjectSync('token');
  }

  saveToken(token: Token) {
    /** Save the authentication token **/
    this.store.setObject('token', token);
    this.token = token;
  }

  deleteToken() {
    this.store.remove('token');
  }

  isAuthenticated() {
    if (this.token) {
      return true;
    }
    return false;
  }
  RequestResetLink(email: string) {
    // return this.userIdentity.resetPassword({ email: email }).pipe(
    //   map(res => {
    //     return res;
    //   }),
    //   catchError(e => this.handleError(e))
    // );
  }


  requestVerificationLink(email: string) {
    // return this.userIdentity.verifyEmail(email).pipe(
    //   map(res => {
    //     return res;
    //   }),
    //   catchError(e => this.handleError(e))
    // );
  }


  /**************************************/
  /************Lock screen***************/
  /**************************************/
  lockScreen() {
    // generate the number
    const max = 1000, min = 100;
    const code = Math.floor(Math.random() * (max - min) + min);
    this.store.set('lock_code', code);
    return code;
  }

  async unlockScreen(code: number): Promise<boolean> {
    const stored_code: number = await this.store.get('lock_code');
    if (stored_code === code) {
      await this.store.remove('lock_code');
      return true;
    } else {
      return false;
    }
  }

  async isScreenLocked() {
    const stored_code: number = await this.store.get('lock_code');
    if (stored_code) {
      return true;
    }
    return false;
  }



  private handleError(e: any): any {
    // console.log(e);
    return throwError(UtilityService.myHttpErrorFormat(e, 'user'));
  }
}
