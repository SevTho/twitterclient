'use strict';
angular.module('main')
.controller('TabsCtrl', function ($scope, $ionicSideMenuDelegate) {

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
