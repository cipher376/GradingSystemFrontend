import { SignalService } from 'src/app/shared/services/signal.service';
import { environment } from './../../../environments/environment';
import { MyAuthService } from './my-auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserService, UtilityService } from '.';
import { Token } from 'src/app/models';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  /**
   *
   */
  token?: Token;
  constructor(private myAuthService: MyAuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    // console.log('INTERCEPTOR');
    // We retrieve the token, if any

    // if content type is not set, default to  application/json
    let newHeaders = req.headers;
    if (newHeaders.get('Content-Type') == null && newHeaders.get('boundary') !== null) {
      // Uploading, don't append any headers;
    } else {
      // console.log('Setting content type')
      newHeaders = newHeaders.set('Content-Type', 'application/json');
    }

    // console.log(newHeaders.get('Content-Type'));
    this.token = this.myAuthService.token;
    if (this.token) {
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.set('Authorization', ('Bearer ' + this.token.token));
    }
    // console.log(newHeaders.get('Authorization'))
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({ headers: newHeaders });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}


@Injectable()
export class RootUrlInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!UtilityService.stringContains(req.url, 'http')) {
      const authReq = req.clone({ url: `${environment.api_root_url + req.url}` });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}



@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private signal: SignalService
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log('Error handling: ');
    return next.handle(req).pipe(map(res => {
      return res;
    }), catchError(err => {
      this.signal.setLoaderBlocking(false); // stop all blocking loaders
      // onError
      console.log(err);
      let myError = err;
      if (err instanceof HttpErrorResponse) {
        console.log(err.status);
        console.log(err.statusText);

        if (err.status === 401) {
          // redirect the user to login page
          // 401 unauthorised user
          console.log('Unauthenticated');
          myError = new HttpErrorResponse({ status: 401, statusText: 'Authentication failed' });
          this.router.navigateByUrl('/login');
          this.toaster.error('Authentication error, please login!');
        } else if (err.status === 0) {
          console.log('No connection');
          this.toaster.error('No connection, Try again later')
          myError = new HttpErrorResponse({ status: 0, statusText: 'No internet connection' });
        } else if (err.status === 423) {
          this.toaster.error('Account deactivated');
        } else if (err.status === 403) {
          this.toaster.error('Access denied');
        } else if (err.status === 403) {
          this.toaster.error('Access denied');
        } else if (err.status === 400) {
          console.log(err)
          if (err.error.error.message.search('401') > -1) {
            this.toaster.error('Authentication failed! Please login')
          } else {
            this.toaster.error(err.statusText || 'Something went wrong');
          }
        } else if (err.status === 500) {
          this.toaster.error('Something went wrong');
        } else if (err.status === 409) {
          this.toaster.error(err.error?.error?.message ?? 'Already in use');

        } else if (err.status === 408) {
          if (err.error.error.message.search('401')>-1) {
            this.toaster.error('You don\'t have permission to view this page')
          } else {
            this.toaster.error('Something went wrong');
          }
        }
      }
      return of(myError); // forward error to service or component for proper handling
    }));
  }
}










/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RootUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
];
