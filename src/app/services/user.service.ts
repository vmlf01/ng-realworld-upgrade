import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AppConstants } from '../app.constants';
import { JWTService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    current: any = null;

    constructor(
        private JWT: JWTService,
        private AppConstants: AppConstants,
        private HttpClient: HttpClient,
        @Inject('$state') private $state: any
    ) { }

    attemptAuth(type: string, credentials) {
        const route = type === 'login'
            ? '/login'
            : '';

        return this.HttpClient.post<any>(`${this.AppConstants.api}/users${route}`, { user: credentials })
            .pipe(tap(res => {
                this.JWT.save(res.user.token);
                this.current = res.user;
            }))
            .toPromise();
    }

    update(fields) {
        return this.HttpClient.put<any>(this.AppConstants.api + '/user', { user: fields })
            .pipe(
                tap(res => this.current = res.user),
                map(res => res.user)
            )
            .toPromise();
    }

    logout(): void {
        this.current = null;
        this.JWT.destroy();
        this.$state.go(this.$state.$current, null, { reload: true });
    }

    verifyAuth(): Promise<boolean> {
        // check for JWT token
        const jwtToken = this.JWT.get();
        if (!jwtToken) {
            return Promise.resolve(false);
        }

        if (this.current) {
            return Promise.resolve(true);
        }
        else {
            const headers = {
                Authorization: `Token ${jwtToken}`
            }
            return this.HttpClient.get<any>(this.AppConstants.api + '/user', { headers })
                .pipe(
                    tap(res => this.current = res.user),
                    map(() => true),
                    catchError(() => {
                        this.JWT.destroy();
                        return of(false);
                    })
                )
                .toPromise();
        }
    }

    ensureAuthIs(bool: boolean): Promise<boolean> {
        return this.verifyAuth()
            .then((authValid) => {
                if (authValid !== bool) {
                    this.$state.go('app.home');
                    return false;
                } else {
                    return true;
                }
            });
    }
}
