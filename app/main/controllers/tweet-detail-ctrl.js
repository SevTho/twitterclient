'use strict';
angular.module('main')
.controller('TweetDetailCtrl', function ($log, $scope, $ionicSideMenuDelegate, $stateParams, Main, TwitterService) {

  var tweetid = $stateParams.tweetid;
  this.controllerData = TwitterService.serviceData;
  var that = this;

  /***************************************
  /* Open Sidemenu
  ***************************************/
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  /***************************************
  /* Get Tweet by TweetID
  /* Parameters: tweetid [int]
  ***************************************/
  TwitterService.getTweetbyID(tweetid).then(function ()
  {
    $log.log(that.controllerData.tweet);
  });

  /***************************************
  /* Open Link in InApp-Browser
  /* Parameters: event [object]
  ***************************************/
  this.getLink = function ($event)
  {
    if ($event.srcElement.tagName === 'A' && $event.srcElement.href !== '') {
      if (ionic.Platform.isWebView()) {
        $event.preventDefault();
      }
      Main.browse($event.srcElement.href);
    }

  };

});
