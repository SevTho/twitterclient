'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaGeolocation, TwitterService, Main) {

  this.controllerData = TwitterService.serviceData;

  var positionG = null;

  Main.showLoader();

  //Android Geolocation Parameters
  var options = { enableHighAccuracy: true, timeout: 21000, maximumAge: 0};

  //Get Current Location, then get trending hashtags based on location
  $cordovaGeolocation.getCurrentPosition(options)
  .then(function (position) {
    console.log('Coordinates -> Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
    positionG = position.coords;
    TwitterService.getGeoHashtags(position.coords.latitude, position.coords.longitude);
  }, function () {
    Main.hideLoader();
    console.log();
    Main.showAlert('Problem with Geolocation');
  });

  $scope.doRefresh = function ()
  {
    TwitterService.getGeoHashtags(positionG.latitude, positionG.longitude).then(function ()
    {
      $scope.$broadcast('scroll.refreshComplete')
    });
  }

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.submit = function ()
  {
    TwitterService.serviceData.hashtag = $scope.searchword;
    $state.go('main.tweetsbyhashtag', { hashtag: $scope.searchword });
  };

  $scope.focused = function ()
  {
    console.log('input focused');
  };

});
