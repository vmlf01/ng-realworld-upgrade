import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AppConstants } from './app.constants';
import { JWTService } from './jwt.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _current = new BehaviorSubject(null);

    public readonly CurrentUser = this._current.asObservable();

    public get current() {
        return this._current.getValue();
    }

    constructor(
        private JWT: JWTService,
        private appConstants: AppConstants,
        private httpClient: HttpClient,
        @Inject('$state') private $state: any
    ) { }

    attemptAuth(type: string, credentials) {
        const route = type === 'login'
            ? '/login'
            : '';

        return this.httpClient.post<any>(`${this.appConstants.api}/users${route}`, { user: credentials })
            .pipe(tap(res => {
                this.JWT.save(res.user.token);
                this._current.next(res.user);
            }))
            .toPromise();
    }

    update(fields) {
        return this.httpClient.put<any>(this.appConstants.api + '/user', { user: fields })
            .pipe(
                tap(res => this._current.next(res.user)),
                map(res => res.user)
            )
            .toPromise();
    }

    logout(): void {
        this._current.next(null);
        this.JWT.destroy();
        this.$state.go(this.$state.$current, null, { reload: true });
    }

    verifyAuth(): Promise<boolean> {
        // check for JWT token
        const jwtToken = this.JWT.get();
        if (!jwtToken) {
            return Promise.resolve(false);
        }

        if (this._current.getValue()) {
            return Promise.resolve(true);
        } else {
            const headers = {
                Authorization: `Token ${jwtToken}`,
            };
            return this.httpClient.get<any>(this.appConstants.api + '/user', { headers })
                .pipe(
                    tap(res => this._current.next(res.user)),
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
