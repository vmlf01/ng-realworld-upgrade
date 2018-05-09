// IMPORTANT: import ng1 bundle before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import './main.ng1';

import { downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';

import { TagsService } from './app/tags.service';
import { HomeComponent } from './app/home/home.component';

function injectorFactory(name) {
  return $injector => $injector.get(name);
}

export const JWTFactory = injectorFactory('JWT');
export const AppConstantsFactory = injectorFactory('AppConstants');
export const UserFactory = injectorFactory('User');
export const $rootScopeFactory = injectorFactory('$rootScope');
export const $scopeFactory = ($injector) => $injector.get('$rootScope').$new();

// Upgraded injectables AngularJS -> Angular
export const UpgradedAppProviders = [
  { provide: 'JWT', useFactory: JWTFactory, deps: ['$injector'] },
  { provide: 'AppConstants', useFactory: AppConstantsFactory, deps: ['$injector'] },
  { provide: 'User', useFactory: UserFactory, deps: ['$injector'] },
  { provide: '$rootScope', useFactory: $rootScopeFactory, deps: ['$injector'] },
  { provide: '$scope', useFactory: $scopeFactory, deps: ['$injector'] },
];

// Downgraded injectables Angular -> AngularJS
declare var angular: any;
export function downgradeAppComponents(appName) {
  const ng1App = angular.module(appName);
  ng1App.factory('Tags', downgradeInjectable(TagsService));
  ng1App.directive('appHome', downgradeComponent({ component: HomeComponent }));
}
