import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { JWTService } from './jwt.service';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private JWT: JWTService,
    private AppConstants: AppConstants,
    private HttpClient: HttpClient,
  ) {}

  getAll() {
    return this.HttpClient.get<any>(this.AppConstants.api + '/tags')
      .pipe(map(res => res.tags))
      .toPromise();
  }
}
