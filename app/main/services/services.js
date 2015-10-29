'use strict';
angular.module('main')
.service('Main', function ($log, $ionicPlatform, $state, $window, $ionicLoading, $ionicPopup, $translate, $cordovaNetwork) {

  /***************************************
  /* InApp Browser
  ***************************************/
  this.browse = function (url)
  {
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

  /***************************************
  /* Show Loader
  ***************************************/
  this.showLoader = function ()
  {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  /***************************************
  /* Hide Loader
  ***************************************/
  this.hideLoader = function ()
  {
    $ionicLoading.hide();
  };

  /***************************************
  /* Show Error Message
  /* Parameters: text
  ***************************************/
  this.showAlert = function (text)
  {
    $ionicPopup.alert({
      title: $translate.instant('ERROR_LABEL'),
      template: text
    });
  }

  /***************************************
  /* Check if Device is Online
  ***************************************/
  this.checkConnection = function ()
  {
    var that = this;
    if (ionic.Platform.isWebView()) {
      if (!$cordovaNetwork.isOnline()) {
        that.showAlert($translate.instant('ERROR001'));
      }
    }
  }

});
