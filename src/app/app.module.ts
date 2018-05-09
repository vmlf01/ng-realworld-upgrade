import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, UrlHandlingStrategy } from '@angular/router';

// IMPORTANT: import upgrade stuff before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import { downgradeAppComponents, UpgradedAppProviders } from '../upgrade';
import { UpgradeModule, downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';
import { setUpLocationSync } from '@angular/router/upgrade';

import { MessageBusService } from './message-bus.service';
import { TagsService } from './tags.service';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { appRoutes, NgUpgradeHandlingStrategy } from './app.routes';
import { AppRootComponent } from './appRoot.component';

const ng1AppName = 'app';

// NOTE: Downgraded injectables Angular -> AngularJS
downgradeAppComponents(ng1AppName);

@NgModule({
  declarations: [
    AppRootComponent,
    HomeComponent,
    ArticleListComponent,
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
  ],
  providers: [
    // NOTE: setup which routes should be handled by Angular
    { provide: UrlHandlingStrategy, useClass: NgUpgradeHandlingStrategy },
    MessageBusService,
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
    // NOTE: bootstrap ng1 app first, since it contains Angular AppRootComponent
    this.ngUpgrade.bootstrap(document.body, [ng1AppName]);

    // NOTE: bootstrap root Angular component
    this.app.bootstrap(AppRootComponent);

    // NOTE: this is needed to sync url changes with router
    setUpLocationSync(this.ngUpgrade);
  }
}
