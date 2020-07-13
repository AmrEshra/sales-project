import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError(error => this.handleGeneralErrors(error))
    );
  }

  private handleGeneralErrors(err: HttpErrorResponse): Observable<any> {
    if (err.status === 500) {   // Backend Error
      console.log(err);
      return throwError(err);
    } else if (err.status === 401) {   // Authentication Error
      console.log(err);
      return throwError(err);
    //  this.authenticationService.generateToken();

      /* redirect */
    /*  const isRouteInAuthPage = this.router.url.startsWith('/auth');
      this.router.navigate(['/auth'], {
        queryParams: {
          error: isRouteInAuthPage ?
            'Wrong username or password.'
            : 'Authentication Failed, please sign-in again.'
        },
        queryParamsHandling: isRouteInAuthPage ? 'merge' : ''});*/

    } else if (err.status === 403) {  // Authorization Error
     // this.router.navigate(['/error/403']);
      console.log(err);
      return throwError(err);
    } else {  // Other Errors
    //  this.loggerService.error(err);
      console.log(err);
      return throwError(err);

    /*  let errorMessage: string;
      if (err.status === 0) {
        errorMessage = 'Application can not reach back end.';
      } else if (err.error && err.error.message) {
        errorMessage =  err.error.message;
      } else {
        errorMessage =  err.message;
      }*/

    /*  this.router.navigate([`/error/500`], {
        queryParams: {
          message: errorMessage
        }
      });*/
    }

    return EMPTY;
  }
}
