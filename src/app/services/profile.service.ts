import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AppConstants } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private AppConstants: AppConstants,
        private HttpClient: HttpClient,
    ) { }

    get(username: string): any {
        return this.HttpClient.get<any>(this._getProfileUrl(username))
            .pipe(map(res => res.profile))
            .toPromise();
    }

    follow(username) {
        return this.HttpClient.post<any>(`${this._getProfileUrl(username)}/follow`, null)
            .toPromise();
    }

    unfollow(username) {
        return this.HttpClient.delete<any>(`${this._getProfileUrl(username)}/follow`)
            .toPromise();
    }

    _getProfileUrl(username: string) {
        return `${this.AppConstants.api}/profiles/${username}`;
    }
}
