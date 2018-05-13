import { Injectable, InjectionToken, Inject } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService implements StorageService {
    constructor(
        @Inject('localStorage') private localStorage: any
    ) {}

    save(key: string, value: any) {
        this.localStorage[key] = value;
    }

    get(key: string): any {
        return this.localStorage[key];
    }

    destroy(key: string) {
        localStorage.removeItem(key);
    }
}
