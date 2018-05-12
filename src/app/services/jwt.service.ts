import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StorageService } from './storage.service';
import { AppConstants } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class JWTService {
    constructor(
        private AppConstants: AppConstants,
        private storage: StorageService
    ) {
    }

    save(token) {
        this.storage.save(this.AppConstants.jwtKey, token);
    }

    get() {
        return this.storage.get(this.AppConstants.jwtKey);
    }

    destroy() {
        this.storage.destroy(this.AppConstants.jwtKey);
    }
}
