import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConstants } from '../core/app.constants';

@Injectable({
    providedIn: 'root',
})
export class CommentsService {

    constructor(
        private appConstants: AppConstants,
        private httpClient: HttpClient
    ) { }

    // Add a comment to an article
    add(slug, payload) {
        const comment = {
            body: payload,
        };
        return this.httpClient.post<any>(this._getCommentsUrl(slug), comment)
            .pipe(map(res => res.comment))
            .toPromise();
    }

    getAll(slug) {
        return this.httpClient.get<any>(this._getCommentsUrl(slug))
            .pipe(map(res => res.comments))
            .toPromise();
    }

    destroy(commentId, slug) {
        return this.httpClient.delete<any>(`${this._getCommentsUrl(slug)}/${commentId}`)
            .toPromise();
    }

    _getCommentsUrl(slug: string): string {
        return `${this.appConstants.api}/articles/${slug}/comments`;
    }
}
