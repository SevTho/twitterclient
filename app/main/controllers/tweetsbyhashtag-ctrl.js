'use strict';
angular.module('main')
.controller('TweetsbyhashtagCtrl', function ($stateParams, $ionicSideMenuDelegate, $log, $ionicPlatform, $window, $scope, $ionicPopover, $filter, TwitterService) {

  this.controllerData = TwitterService.serviceData;
  var hashtag = $stateParams.hashtag;
  TwitterService.serviceData.hashtag = hashtag;
  var that = this;

  /***************************************
  /* Open Sidemenu
  ***************************************/
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  /***************************************
  /* Get Tweets by Hashtag
  ***************************************/
  TwitterService.getTweetsByHashtag('loader').then(function ()
  {
    $log.log(that.controllerData.tweets);
  });

  /***************************************
  /* Pull to Refresh
  ***************************************/
  $scope.doRefresh = function ()
  {
    TwitterService.getTweetsByHashtag('noloader').then(function ()
    {
      $scope.$broadcast('scroll.refreshComplete')
    });
  }

  /***************************************
  /* Search Submit
  ***************************************/
  $scope.submit = function ()
  {
    TwitterService.serviceData.hashtag = $scope.searchword;
    TwitterService.getTweetsByHashtag();
    $log.log(TwitterService.serviceData.searchword)
    document.activeElement.blur();
  };

  /***************************************
  /* Popover Template
  ***************************************/
  var template = '<ion-popover-view><ion-header-bar> <h3 class="title">Filter Tweets</h3> </ion-header-bar>' +
  '<ion-content><div class="list">' +
  '<label ng-click="sortTweets(\'date\')" class="item item-radio"><input type="radio" name="filtergroup"><div class="item-content">Date</div><i class="radio-icon ion-checkmark"></i></label>' +
  '<label ng-click="sortTweets(\'author\')" class="item item-radio"><input type="radio" name="filtergroup"><div class="item-content">Author</div><i class="radio-icon ion-checkmark"></i></label>' +
  '</div></ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  /***************************************
  /* Open Popover
  /* Parameter: event
  ***************************************/
  $scope.openPopover = function ($event) {
    $scope.popover.show($event);
  };

  /***************************************
  /* Close Popover
  ***************************************/
  $scope.closePopover = function () {
    $scope.popover.hide();
  };

  /***************************************
  /* Sort Tweets
  /* Parameter: sortvalinput [string]
  ***************************************/
  $scope.sortTweets = function (sortvalinput) {
    switch (sortvalinput) {
      case 'date':
        $scope.sortval = '-created_at'
        $log.log(this.sortval);
        break;
      case 'author':
        $scope.sortval = 'user.name'
        $log.log(this.sortval);
        break;
    }
  };


});
