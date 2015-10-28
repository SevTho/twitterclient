'use strict';
angular.module('main')
.service('Main', function ($log, $ionicPlatform, $state, $window, $http, $ionicLoading) {

  this.serviceData = {
    tweets: [],
    tweet: null,
    hashtag: '#angular',
    hashtags: ['']
  };

  var consumerKey = encodeURIComponent('BzQ15IBII9c5rvJBfY2qHs2XW');
  var consumerSecret = encodeURIComponent('K7i7xlG55ENzUpr5KchJH0E9AdFsexUKLUARmAEWeZXm2aCtGE');

  //Get twitter security token
  this.getToken = function () {
    var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
    return $http({
      method: 'POST',
      url: 'https://api.twitter.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': 'Basic ' + tokenCredentials
      }, data: 'grant_type=client_credentials'
    })
    .then(function (result) {
      /*jshint -W106 */
      if (result.data && result.data.access_token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
      }
      return true;
    })
    .catch(function (error) {
      return console.error(error);
    });
  };

  //Get Tweets by Hashtag
  this.getTweetsByHashtag = function (loader)
  {
    var that = this;
    console.log(that.serviceData.hashtag);
    if (loader === 'noloader') {
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {q: that.serviceData.hashtag, 'result_type': 'recent', count: 30 }
      }).then(function successCallback (response) {
        that.serviceData.tweets = response.data.statuses;
        $ionicLoading.hide();
        return response;
      }, function errorCallback (error) {
        console.error(error);
        return error;
      });
    }
    else {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {q: that.serviceData.hashtag, 'result_type': 'recent', count: 30 }
      }).then(function successCallback (response) {
        that.serviceData.tweets = response.data.statuses;
        $ionicLoading.hide();
        return response;
      }, function errorCallback (error) {
        console.error(error);
        return error;
      });
    }
  };

  this.getTweetbyID = function (twitterid)
  {
    var that = this;
    return $http({
      method: 'GET',
      url: 'https://api.twitter.com/1.1/statuses/show.json',
      params: {id: twitterid}
    }).then(function successCallback (response) {
      that.serviceData.tweet = response.data;
      return response;
    }, function errorCallback (error) {
      console.error(error);
      return error;
    });
  };

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

  this.getGeoHashtags = function (latitude, longitude)
  {
    var that = this;
    that.getToken().then(function () {
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/trends/closest.json?lat=' + latitude + '&long=' + longitude + ''
      }).then(function successCallback (response) {
        console.log(response);
        var woeid = response.data[0].woeid;
        return $http({
          method: 'GET',
          url: 'https://api.twitter.com/1.1/trends/place.json',
          params: {id: woeid}
        }).then(function successCallback (response) {
          var hashtags = response.data[0].trends;
          that.serviceData.hashtags = response.data[0].trends;
          $ionicLoading.hide();
          return hashtags;
        }, function errorCallback (error) {
          $ionicLoading.hide();
          console.error(error);
          return error;
        });
      }, function errorCallback (error) {
        $ionicLoading.hide();
        console.error(error);
        return error;
      });
    });
  };

});
