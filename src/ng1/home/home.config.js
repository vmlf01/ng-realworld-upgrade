function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    // NOTE: configure route to use downgraded component
    // instead of AngularJS controller/template
    // controller: 'HomeCtrl',
    // controllerAs: '$ctrl',
    // templateUrl: 'home/home.html',
    template: '<app-home></app-home>',
    title: 'Home'
  });

};

export default HomeConfig;
