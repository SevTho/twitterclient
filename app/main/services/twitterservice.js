'use strict';
angular.module('main')
.service('TwitterService', function ($log, $ionicPlatform, $state, $window, $http, Main) {

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
    .catch(function () {
      return Main.showAlert('Error 001: Could not get twitter security token');
    });
  };

  //Get Tweets by Hashtag
  this.getTweetsByHashtag = function (loader)
  {
    var that = this;
    console.log(that.serviceData.hashtag);
    if (loader === 'loader') {
      Main.showLoader();
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {q: that.serviceData.hashtag, 'result_type': 'recent', count: 30 }
      }).then(function successCallback (response) {
        that.serviceData.tweets = response.data.statuses;
        Main.hideLoader();
        return response;
      }, function errorCallback () {
        Main.hideLoader();
        return Main.showAlert('Error 002: Couldnt not connect with Twitter');
      });
    }
    else {
      return $http({
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        params: {q: that.serviceData.hashtag, 'result_type': 'recent', count: 30 }
      }).then(function successCallback (response) {
        that.serviceData.tweets = response.data.statuses;
        return response;
      }, function errorCallback () {
        return Main.showAlert('Error 003: Could not Connect with Twitter');
      });
    }
  };

  this.getTweetbyID = function (twitterid)
  {
    Main.showLoader();
    var that = this;
    return $http({
      method: 'GET',
      url: 'https://api.twitter.com/1.1/statuses/show.json',
      params: {id: twitterid}
    }).then(function successCallback (response) {
      that.serviceData.tweet = response.data;
      Main.hideLoader();
      return response;
    }, function errorCallback () {
      Main.hideLoader();
      return Main.showAlert('Error 004: Could not connect with Twitter');
    });
  };

  this.getGeoHashtags = function (latitude, longitude)
  {
    var that = this;
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
        Main.hideLoader();
        return hashtags;
      }, function errorCallback () {
        Main.hideLoader();
        return Main.showAlert('Error 005: Could not connect with Twitter');
      });
    }, function errorCallback () {
      Main.hideLoader();
      return Main.showAlert('Error 006:Could not connect with Twitter');
    });
  };
});
