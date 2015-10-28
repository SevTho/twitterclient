'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicSideMenuDelegate, TwitterService, Main) {

  this.controllerData = TwitterService.serviceData;

  Main.showLoader();

  var onSuccess = function (position) {
    console.log('Coordinates -> Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
    TwitterService.getGeoHashtags(position.coords.latitude, position.coords.longitude);
  };

  function onError (error) {
    console.error(error);
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

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
