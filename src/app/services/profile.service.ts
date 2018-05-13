import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AppConstants } from '../core/app.constants';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    constructor(
        private appConstants: AppConstants,
        private httpClient: HttpClient
    ) { }

    get(username: string): any {
        return this.httpClient.get<any>(this._getProfileUrl(username))
            .pipe(map(res => res.profile))
            .toPromise();
    }

    follow(username) {
        return this.httpClient.post<any>(`${this._getProfileUrl(username)}/follow`, null)
            .toPromise();
    }

    unfollow(username) {
        return this.httpClient.delete<any>(`${this._getProfileUrl(username)}/follow`)
            .toPromise();
    }

    _getProfileUrl(username: string) {
        return `${this.appConstants.api}/profiles/${username}`;
    }
}
