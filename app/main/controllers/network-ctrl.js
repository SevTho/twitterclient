'use strict';
angular.module('main')
.controller('NetworkCtrl', function ($cordovaNetwork) {

  this.controllerData = {
    Networktype: null,
    State: null
  };

  /**********************************************
  /* Get Information about the Device Connection
  ***********************************************/
  if (ionic.Platform.isWebView()) {
    this.controllerData.Networktype = $cordovaNetwork.getNetwork();
    if ($cordovaNetwork.isOnline()) {
      this.controllerData.State = 'Online'
    }
    else {
      this.controllerData.State = 'Offline'
    }
  }

});
