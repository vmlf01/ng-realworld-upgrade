import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { JWTService } from './jwt.service';
import { AppConstants } from './app.constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private appConstants: AppConstants,
        private router: Router,
        private JWT: JWTService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiRequest = request.url.indexOf(this.appConstants.api) === 0;
        const jwtToken = this.JWT.get();
        if (isApiRequest && jwtToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${jwtToken}`,
                },
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
