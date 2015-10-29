'use strict';
angular.module('main')
.controller('AboutCtrl', function ($log, $scope, $ionicSideMenuDelegate) {

  /***************************************
  /* Open Sidemenu
  ***************************************/
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

});
