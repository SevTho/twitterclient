'use strict';
angular.module('main')
.controller('TweetsbyhashtagCtrl', function ($stateParams, $ionicSideMenuDelegate, $log, $ionicPlatform, $window, $scope, $ionicPopover, $filter, Main) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  this.controllerData = Main.serviceData;
  var that = this;

  var hashtag = $stateParams.hashtag;
  Main.serviceData.hashtag = hashtag;
  console.log(hashtag);

  Main.getToken().then(function () {
    Main.getTweetsByHashtag('loader').then(function ()
    {
      console.log('test');
      console.log(that.controllerData.tweets);
    });
  });

  $scope.doRefresh = function ()
  {
    Main.getToken().then(function () {
      Main.getTweetsByHashtag('noloader').then(function ()
      {
        $scope.$broadcast('scroll.refreshComplete')
      });
    });
  }

  $scope.submit = function ()
  {
    console.log('input submit');
    Main.serviceData.hashtag = $scope.searchword;
    Main.getTweetsByHashtag();
    console.log(Main.serviceData.searchword)
    document.activeElement.blur();
  };

  $scope.focused = function ()
  {
    console.log('input focused');
  };

  var template = '<ion-popover-view><ion-header-bar> <h3 class="title">Filter Tweets</h3> </ion-header-bar>' +
  '<ion-content><div class="list">' +
  '<label ng-click="sortTweets(\'date\')" class="item item-radio"><input type="radio" name="filtergroup"><div class="item-content">Date</div><i class="radio-icon ion-checkmark"></i></label>' +
  '<label ng-click="sortTweets(\'author\')" class="item item-radio"><input type="radio" name="filtergroup"><div class="item-content">Author</div><i class="radio-icon ion-checkmark"></i></label>' +
  '</div></ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $scope.openPopover = function ($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function () {
    $scope.popover.hide();
  };

  $scope.sortTweets = function (input) {
    switch (input) {
      case 'date':
        $scope.sortval = '-created_at'
        console.log(this.sortval);
        break;
      case 'author':
        $scope.sortval = 'user.name'
        console.log(this.sortval);
        break;
    }
  };


});