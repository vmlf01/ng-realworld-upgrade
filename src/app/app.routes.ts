import { Routes, UrlHandlingStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
];

// NOTE: setup which routes are handled by Angular router
export class NgUpgradeHandlingStrategy implements UrlHandlingStrategy {
    shouldProcessUrl(url) {
        // NOTE:
        // return true to let Angular router handle url
        // return false to let ng1 router handle url
        return url.toString() === "/";
    }

    extract(url) {
        return url;
    }

    merge(url, whole) {
        return url;
    }
}
