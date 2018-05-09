import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// IMPORTANT: import ng1 bundle before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import '../main.ng1';
import { UpgradeModule } from '@angular/upgrade/static';

const ng1AppName = 'app';

@NgModule({
  declarations: [
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
  ],
  providers: [
  ],
})
export class AppModule {
  constructor(private ngUpgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.ngUpgrade.bootstrap(document.body, [ng1AppName]);
  }
}
