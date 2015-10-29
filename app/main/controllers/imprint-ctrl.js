'use strict';
angular.module('main')
.controller('ImprintCtrl', function ($log, $scope, $ionicSideMenuDelegate) {

  //Open Side Menu
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
