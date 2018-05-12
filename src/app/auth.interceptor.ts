import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { JWTService } from './services/jwt.service';
import { AppConstants } from './app.constants';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private AppConstants: AppConstants,
        private Router: Router,
        private JWT: JWTService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiRequest = request.url.indexOf(this.AppConstants.api) === 0;
        const jwtToken = this.JWT.get();
        if (isApiRequest && jwtToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${jwtToken}`
                }
            });
        }

        return next.handle(request)
            .pipe(
                catchError(
                    (err, caught) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) {
                                // clear any JWT token being stored
                                this.JWT.destroy();

                                // do a hard page refresh
                                window.location.reload(true);
                            }
                        }
                        return of(err);
                    }
                )
            );
    }
}
