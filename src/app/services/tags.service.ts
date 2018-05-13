import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { AppConstants } from '../core/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TagsService {

  constructor(
    private appConstants: AppConstants,
    private httpClient: HttpClient
  ) {}

  getAll() {
    return this.httpClient.get<any>(this.appConstants.api + '/tags')
      .pipe(map(res => res.tags))
      .toPromise();
  }
}
