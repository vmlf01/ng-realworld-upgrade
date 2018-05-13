import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';
import { environment, appConstants } from '../environments/environment';

// IMPORTANT: import upgrade stuff before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import { downgradeAppComponents, UpgradedAppProviders } from '../upgrade';
import { UpgradeModule, downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';
import { setUpLocationSync } from '@angular/router/upgrade';

import { AppConstants } from './core/app.constants';
import { appRoutes, NgUpgradeHandlingStrategy } from './app.routes';

import { TagsService } from './services/tags.service';
import { CommentsService } from './services/comments.service';
import { ArticlesService } from './services/articles.service';

import { AppRootComponent } from './appRoot.component';
import { HomeComponent } from './home/home.component';
import { ProfileService } from './services/profile.service';
import { ArticlesModule } from './articles/articles.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

const ng1AppName = 'app';
declare var angular: any;

// NOTE: Downgraded injectables Angular -> AngularJS
downgradeAppComponents(ng1AppName);

@NgModule({
  declarations: [
    AppRootComponent,
    HomeComponent,
  ],
  entryComponents: [
    AppRootComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    UpgradeModule,
    CoreModule,
    SharedModule,
    ArticlesModule,
  ],
  providers: [
    // NOTE: setup which routes should be handled by Angular
    { provide: UrlHandlingStrategy, useClass: NgUpgradeHandlingStrategy },
    // other app providers
    { provide: AppConstants, useValue: appConstants },
    ArticlesService,
    CommentsService,
    ProfileService,
    TagsService,
    // NOTE: Upgraded injectables AngularJS -> Angular
    ...UpgradedAppProviders,
  ],
})
export class AppModule {
  constructor(
    private app: ApplicationRef,
    private ngUpgrade: UpgradeModule
  ) { }

  ngDoBootstrap() {
    const ng1App = angular.module(ng1AppName);

    // setup Angular root component bootstrap to deal with
    // ng1 app view resolve async delay
    ng1App.run(($rootScope) => {
      'ngInject';

      const unregisterViewLoaded = $rootScope.$on('$viewContentLoaded', (event, viewName) => {
        if (viewName === '@app') {
            this.app.bootstrap(AppRootComponent);
            unregisterViewLoaded();
        }
      });
    });

    // NOTE: bootstrap ng1 app first, since it contains Angular AppRootComponent
    this.ngUpgrade.bootstrap(document.body, [ng1AppName]);

    // NOTE: this is needed to sync url changes with router
    setUpLocationSync(this.ngUpgrade);
  }
}
