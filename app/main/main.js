'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
angular
 .module('ionic')
 .config(['$provide', function ($provide) {
   $provide.decorator('ionTabNavDirective', ['$delegate', function ($delegate) {
     var directive = $delegate[0]
     directive.template = '<a ng-class="{\'tab-item-active\': isTabActive(), \'has-badge\':badge, \'tab-hidden\':isHidden()}" ng-disabled="disabled()" class="tab-item"> <span class="badge {{badgeStyle}}" ng-if="badge">{{badge}}</span> <i class="icon {{getIconOn()}}"></i> <span class="tab-title" ng-bind-html="title"></span></a>'
     return $delegate
   }])
 }])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/geotweets');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html',
      controller: 'TabsCtrl as tabsC'
    })
      .state('main.geotweets', {
        url: '/geotweets',
        views: {
          'tab-tweets': {
            templateUrl: 'main/templates/geotweets.html',
            controller: 'GeotweetsCtrl as geotweetsC'
          }
        }
      })
      .state('main.tweetsbyhashtag', {
        url: '/geotweets/tweetsbyhashtag/:hashtag',
        views: {
          'tab-tweets': {
            templateUrl: 'main/templates/tweetsbyhashtag.html',
            controller: 'TweetsbyhashtagCtrl as tweetsbyhashtagC'
          }
        }
      })
      .state('main.tweetDetail', {
        url: '/geotweets/tweetsbyhashtag/:hashtag/detail/:tweetid',
        views: {
          'tab-tweets': {
            templateUrl: 'main/templates/tweetdetail.html',
            controller: 'TweetDetailCtrl as tweetdetailC'
          }
        }
      })
      .state('main.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'main/templates/about.html',
            controller: 'AboutCtrl as aboutC'
          }
        }
      })
      .state('main.imprint', {
        url: '/imprint',
        views: {
          'tab-imprint': {
            templateUrl: 'main/templates/imprint.html',
            controller: 'ImprintCtrl as imprintC'
          }
        }
      });
}).config(function ($ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
  $ionicConfigProvider.navBar.alignTitle('center'); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.position('bottom'); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style('standard'); //Makes them all look the same across all OS
});
