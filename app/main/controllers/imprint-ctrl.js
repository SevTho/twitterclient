'use strict';
angular.module('main')
.controller('ImprintCtrl', function ($log, $scope, $ionicSideMenuDelegate) {

  /***************************************
  /* Open Sidemenu
  ***************************************/
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
