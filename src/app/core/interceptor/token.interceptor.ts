/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { URL } from '../../shared/constant/url.constant';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private readonly _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Check if the request is for getting the token
    if (req.url.includes(URL.getToken)) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    let authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const errorMessage = error?.error?.serviceStatus?.errorMessage;
          if (errorMessage) {
            window.location.href = errorMessage;
          }
        }

        //You have to show a pop-up here
        if (
          error.status === 500 ||
          error.status == 503 ||
          error.status == 501
        ) {
          console.log(`Error 500, ${error.message}`);
        }

        //You have to redirect to 403 page
        if (error.status === 403) {
          console.log(`Error 403, ${error.message}`);
        }

        if (error.status === 404) {
          this._router.navigate(['/page/not-found']);
        }

        //leave space for other error codes such as 400 for component to handle
        return throwError(() => error);
      }),
    );
  }
}
