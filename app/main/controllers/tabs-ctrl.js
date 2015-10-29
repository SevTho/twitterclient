'use strict';
angular.module('main')
.controller('TabsCtrl', function ($scope, $ionicSideMenuDelegate) {

  //Open Side Menu
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
