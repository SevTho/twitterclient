'use strict';
angular.module('main')
.controller('ImprintCtrl', function ($log, $scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
