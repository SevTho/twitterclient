'use strict';

describe('module: main, controller: TweetDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var TweetDetailCtrl;
  beforeEach(inject(function ($controller) {
    TweetDetailCtrl = $controller('TweetDetailCtrl');
  }));

  it('should do something', function () {
    expect(!!TweetDetailCtrl).toBe(true);
  });

});
