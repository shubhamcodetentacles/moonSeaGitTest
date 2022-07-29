import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.spinner.show();
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    request = request.clone({
      headers: request.headers.set('charset', 'UTF-8'),
    });

    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*'),
    });
    request = request.clone({
      headers: request.headers.set('X-API-Key',
        'hq6rjDvR47cpC9enmXcjpEBXysAwXJAxsQG3A0JbUYlBVAfnnUFfkdEY2OOoErju'),
    });


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        return throwError(error);
      })
      ,
      finalize(()=>{
        this.spinner.hide()
      })
    );
  }
}
