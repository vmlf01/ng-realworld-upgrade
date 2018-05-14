import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { JWTService } from './jwt.service';
import { UserService } from './user.service';
import { TokenInterceptor } from './auth.interceptor';
import { StorageService } from './storage.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        // NOTE: setup HTTP auth interceptor
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: 'localStorage', useValue: window.localStorage },
        { provide: StorageService, useClass: LocalStorageService },
        { provide: 'reloadPage', useValue: () => window.location.reload() },
        // AppConstants,
        JWTService,
        UserService,
    ],
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
