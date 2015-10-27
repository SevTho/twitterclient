'use strict';
angular.module('main')
.controller('TweetDetailCtrl', function ($log, $scope, $ionicSideMenuDelegate, $stateParams, Main) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  var twitterid = $stateParams.tweetid;
  console.log(twitterid);

  this.controllerData = Main.serviceData;
  var that = this;

  Main.getToken().then(function () {
    Main.getTweetbyID(twitterid).then(function ()
    {
      console.log(that.controllerData.tweet);
    });
  });

  this.getLink = function ($event)
  {
    console.log('test');
    if ($event.srcElement.tagName === 'A' && $event.srcElement.href !== '') {
      if (ionic.Platform.isWebView()) {
        $event.preventDefault();
      }
      Main.browse($event.srcElement.href);
    }

  };

});
