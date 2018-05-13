import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageService } from './storage.service';
import { AppConstants } from './app.constants';

@Injectable({
    providedIn: 'root',
})
export class JWTService {
    constructor(
        private appConstants: AppConstants,
        private storage: StorageService
    ) {
    }

    save(token) {
        this.storage.save(this.appConstants.jwtKey, token);
    }

    get() {
        return this.storage.get(this.appConstants.jwtKey);
    }

    destroy() {
        this.storage.destroy(this.appConstants.jwtKey);
    }
}
