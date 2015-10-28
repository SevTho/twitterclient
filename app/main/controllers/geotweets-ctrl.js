'use strict';
angular.module('main')
.controller('GeotweetsCtrl', function ($scope, $state, $ionicLoading, $ionicSideMenuDelegate, Main) {

  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner>'
  });

  this.controllerData = Main.serviceData;
  console.log(this.controllerData);

  var onSuccess = function (position) {
    console.log('Coordinates -> Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude);
    Main.getGeoHashtags(position.coords.latitude, position.coords.longitude);
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
