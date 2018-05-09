import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    @Inject('JWT') private JWT: any,
    @Inject('AppConstants') private AppConstants: any,
    private HttpClient: HttpClient,
  ) {}

  getAll() {
    return this.HttpClient.get<any>(this.AppConstants.api + '/tags')
      .pipe(
        map(res => res.tags),
      )
      .toPromise();
  }
}
