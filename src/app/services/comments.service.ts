import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConstants } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        private AppConstants: AppConstants,
        private HttpClient: HttpClient,
    ) { }

    // Add a comment to an article
    add(slug, payload) {
        const comment = {
            body: payload,
        };
        return this.HttpClient.post<any>(this._getCommentsUrl(slug), comment)
            .pipe(map(res => res.comment))
            .toPromise();
    }

    getAll(slug) {
        return this.HttpClient.get<any>(this._getCommentsUrl(slug))
            .pipe(map(res => res.comments))
            .toPromise();
    }

    destroy(commentId, slug) {
        return this.HttpClient.delete<any>(`${this._getCommentsUrl(slug)}/${commentId}`)
            .toPromise();
    }

    _getCommentsUrl(slug: string): string {
        return `${this.AppConstants.api}/articles/${slug}/comments`;
    }
}
