import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// IMPORTANT: import upgrade stuff before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import { downgradeAppComponents, UpgradedAppProviders } from '../upgrade';
import { UpgradeModule, downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';

import { MessageBusService } from './message-bus.service';
import { TagsService } from './tags.service';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';

const ng1AppName = 'app';

@NgModule({
  declarations: [
    HomeComponent,
    ArticleListComponent
  ],
  entryComponents: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UpgradeModule,
  ],
  providers: [
    MessageBusService,
    TagsService,
    // Upgraded injectables AngularJS -> Angular
    ...UpgradedAppProviders,
  ],
})
export class AppModule {
  constructor(private ngUpgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.ngUpgrade.bootstrap(document.body, [ng1AppName]);
  }
}

// Downgraded injectables Angular -> AngularJS
downgradeAppComponents(ng1AppName);
