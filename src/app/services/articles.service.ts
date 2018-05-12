import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConstants } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    constructor(
        private AppConstants: AppConstants,
        private HttpClient: HttpClient,
    ) { }

    query(config: { type: 'all' | 'feed', filters: { [key: string]: string } }) {
        const type = config.type === 'feed'
            ? config.type
            : '';

        return this.HttpClient.get<any>(this._getArticlesUrl(type), { params: config.filters || null })
            .toPromise();
    }

    get(slug: string) {
        if (!slug.replace(" ", "")) {
            return Promise.reject('Article slug is empty');
        }

        return this.HttpClient.get<any>(this._getArticlesUrl(slug))
            .pipe(map(res => res.article))
            .toPromise();
    }

    destroy(slug: string) {
        return this.HttpClient.delete<any>(this._getArticlesUrl(slug))
            .pipe(map(res => res.article))
            .toPromise();
    }

    save({ slug, ...article }: { slug: string, article: object }) {
        const url = slug ? this._getArticlesUrl(slug) : this._getArticlesUrl();
        const method = slug ? 'PUT' : 'POST';
        const body = { article };

        return this.HttpClient.request<any>(method, url, { body })
            .pipe(map(res => res.article))
            .toPromise();
    }

    favorite(slug: string) {
        return this.HttpClient.post<any>(`${this._getArticlesUrl(slug)}/favorite`, {})
            .toPromise();
    }

    unfavorite(slug) {
        return this.HttpClient.delete<any>(`${this._getArticlesUrl(slug)}/favorite`)
            .toPromise();
    }

    _getArticlesUrl(type?: string): string {
        return `${this.AppConstants.api}/articles${type ? `/${type}` : ''}`;
    }
}
