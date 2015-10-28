'use strict';
angular.module('main')
.service('Main', function ($log, $ionicPlatform, $state, $window) {

  //InApp Browser
  this.browse = function (url)
  {
    console.log(url);
    if (ionic.Platform.isWebView()) {
      $window.webview.openWebView(null, null, {
        iconColor: '#ffffff',
        backgroundColor: '#4a87ee',
        isPDF: false,
        url: url,
        visibleAddress: false,
        editableAddress: false,
        icons: {
          backward: true,
          forward: true,
          refresh: true
        }
      });
    }
  };
});
