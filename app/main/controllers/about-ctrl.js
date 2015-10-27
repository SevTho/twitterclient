'use strict';
angular.module('main')
.controller('AboutCtrl', function ($log, $scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
