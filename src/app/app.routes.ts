import { Routes, UrlHandlingStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmptyComponent } from './empty/empty.component';

export const appRoutes: Routes = [
    { path: 'article/:slug', component: EmptyComponent },
    { path: 'register', component: EmptyComponent },
    { path: 'profile/:username', component: EmptyComponent },
    { path: '', pathMatch: 'full', component: HomeComponent },
];

// NOTE: setup which routes are handled by Angular router
export class NgUpgradeHandlingStrategy implements UrlHandlingStrategy {
    shouldProcessUrl(url) {
        // NOTE:
        // return true to let Angular router handle url
        // return false to let ng1 router handle url
        const shouldProcess = url.toString() === '/'
            || url.toString().startsWith('/article')
            || url.toString().startsWith('/register')
            || url.toString().startsWith('/profile');
        return shouldProcess;
    }

    extract(url) {
        return url;
    }

    merge(url, whole) {
        return url;
    }
}
