'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaGeolocation, TwitterService, Main) {

  this.controllerData = TwitterService.serviceData;
  var positionG = null;
  var geooptions = { enableHighAccuracy: true, timeout: 21000, maximumAge: 0};

  /***************************************
  /* Show Loader
  ***************************************/
  Main.showLoader();

  /***********************************************************
  /* Get Current Location
  /* Parameters: geooptions [array]
  /* then --> Get trending Hashtags based on current Location
  /* then --> Parameters: latitude, longitude [int, int]
  ***********************************************************/
  $cordovaGeolocation.getCurrentPosition(geooptions)
  .then(function (position) {
    positionG = position.coords;
    TwitterService.getGeoHashtags(position.coords.latitude, position.coords.longitude);
  }, function () {
    Main.hideLoader();
    Main.showAlert('Problem with Geolocation');
  });

  /***************************************
  /* Pull to Refresh
  ***************************************/
  $scope.doRefresh = function ()
  {
    TwitterService.getGeoHashtags(positionG.latitude, positionG.longitude).then(function ()
    {
      $scope.$broadcast('scroll.refreshComplete')
    });
  }

  /***************************************
  /* Open Side Menu
  ***************************************/
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  /***************************************
  /* Search Submit
  ***************************************/
  $scope.submit = function ()
  {
    TwitterService.serviceData.hashtag = $scope.searchword;
    $state.go('main.tweetsbyhashtag', { hashtag: $scope.searchword });
  };
});
