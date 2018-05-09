import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// IMPORTANT: import upgrade stuff before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import { downgradeAppComponents, UpgradedAppProviders } from '../upgrade';
import { UpgradeModule, downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';

import { TagsService } from './tags.service';

const ng1AppName = 'app';

@NgModule({
  declarations: [
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UpgradeModule,
  ],
  providers: [
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
