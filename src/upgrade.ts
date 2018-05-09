// IMPORTANT: import ng1 bundle before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import './main.ng1';

import { downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';

import { TagsService } from './app/tags.service';

function injectorFactory(name) {
  return $injector => $injector.get(name);
}

export const JWTFactory = injectorFactory('JWT');
export const AppConstantsFactory = injectorFactory('AppConstants');

// Upgraded injectables AngularJS -> Angular
export const UpgradedAppProviders = [
  { provide: 'JWT', useFactory: JWTFactory, deps: ['$injector'] },
  { provide: 'AppConstants', useFactory: AppConstantsFactory, deps: ['$injector'] },
];

// Downgraded injectables Angular -> AngularJS
declare var angular: any;
export function downgradeAppComponents(appName) {
  const ng1App = angular.module(appName);
  ng1App.factory('Tags', downgradeInjectable(TagsService));
}
