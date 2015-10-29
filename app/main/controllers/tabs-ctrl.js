'use strict';
angular.module('main')
.controller('TabsCtrl', function ($scope, $ionicSideMenuDelegate) {

  /***************************************
  /* Open Sidemenu
  ***************************************/
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
