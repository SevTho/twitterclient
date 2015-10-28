'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicSideMenuDelegate, $cordovaGeolocation, TwitterService, Main) {

  this.controllerData = TwitterService.serviceData;

  Main.showLoader();

  var options = { enableHighAccuracy: true, timeout: 21000, maximumAge: 0};

  $cordovaGeolocation.getCurrentPosition(options)
  .then(function (position) {
    console.log('Coordinates -> Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
    TwitterService.getGeoHashtags(position.coords.latitude, position.coords.longitude);
  }, function (error) {
    Main.hideLoader();
    console.log(error);
    Main.showAlert(error);
  });

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
