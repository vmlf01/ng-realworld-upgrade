// IMPORTANT: import ng1 bundle before importing UpgradeModule,
// so AngularJS loads before UpgradeModule
import './main.ng1';

import { downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';

import { appConstants } from './environments/environment';

import { ArticlesService } from './app/services/articles.service';
import { CommentsService } from './app/services/comments.service';
import { ProfileService } from './app/services/profile.service';
import { TagsService } from './app/services/tags.service';
import { UserService } from './app/core/user.service';

import { ArticleMetaComponent } from './app/articles/article-meta/article-meta.component';
import { HomeComponent } from './app/home/home.component';
import { FavoriteBtnComponent } from './app/shared/favorite-btn/favorite-btn.component';
import { FollowBtnComponent } from './app/shared/follow-btn/follow-btn.component';

function injectorFactory(name) {
  return $injector => $injector.get(name);
}

export const UserFactory = injectorFactory('User');
export const $rootScopeFactory = injectorFactory('$rootScope');
export const $scopeFactory = ($injector) => $injector.get('$rootScope').$new();
export const $stateFactory = injectorFactory('$state');

// Upgraded injectables AngularJS -> Angular
export const UpgradedAppProviders = [
  { provide: 'User', useFactory: UserFactory, deps: ['$injector'] },
  { provide: '$rootScope', useFactory: $rootScopeFactory, deps: ['$injector'] },
  { provide: '$scope', useFactory: $scopeFactory, deps: ['$injector'] },
  { provide: '$state', useFactory: $stateFactory, deps: ['$injector'] },
];

// Downgraded injectables Angular -> AngularJS
declare var angular: any;
export function downgradeAppComponents(appName) {
  const ng1App = angular.module(appName);
  ng1App.constant('AppConstants', appConstants);
  ng1App.factory('Articles', downgradeInjectable(ArticlesService));
  ng1App.factory('Comments', downgradeInjectable(CommentsService));
  ng1App.factory('Profile', downgradeInjectable(ProfileService));
  ng1App.factory('Tags', downgradeInjectable(TagsService));
  ng1App.factory('User', downgradeInjectable(UserService));
  ng1App.directive('appHome', downgradeComponent({ component: HomeComponent }));
  ng1App.directive('articleMeta', downgradeComponent({ component: ArticleMetaComponent }));
  ng1App.directive('favoriteBtn', downgradeComponent({ component: FavoriteBtnComponent }));
  ng1App.directive('followBtn', downgradeComponent({ component: FollowBtnComponent }));
}
