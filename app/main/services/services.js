'use strict';
angular.module('main')
.service('Main', function ($log, $ionicPlatform, $state, $window, $ionicLoading, $ionicPopup, $cordovaNetwork) {

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

  this.showLoader = function ()
  {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  this.hideLoader = function ()
  {
    $ionicLoading.hide();
  };

  this.showAlert = function (text)
  {
    $ionicPopup.alert({
      title: 'Fehler',
      template: text
    });
  }

  this.checkConnection = function ()
  {
    var that = this;
    if (ionic.Platform.isWebView()) {
      if (!$cordovaNetwork.isOnline()) {
        that.showAlert('You want to connect with twitter without Connection to the Internet ?');
      }
    }
  }

});
