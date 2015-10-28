'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicSideMenuDelegate, Main) {

  var onSuccess = function (position) {
    console.log('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
    Main.getGeoHashtags();
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
    Main.serviceData.hashtag = $scope.searchword;
    $state.go('main.tweetsbyhashtag', { hashtag: $scope.searchword });
  };

  $scope.focused = function ()
  {
    console.log('input focused');
  };

});
