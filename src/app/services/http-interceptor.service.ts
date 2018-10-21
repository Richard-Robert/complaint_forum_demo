import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPAuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authDetails = JSON.parse(
      localStorage.getItem('Authentication Details')
    );
    if (authDetails) {
      const idToken = authDetails.token;
      const cloned = req.clone({
        setHeaders: {
          'x-access-token': idToken
        }
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
