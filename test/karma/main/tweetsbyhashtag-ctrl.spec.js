'use strict';

describe('module: main, controller: TweetsbyhashtagCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var TweetsbyhashtagCtrl;
  beforeEach(inject(function ($controller) {
    TweetsbyhashtagCtrl = $controller('TweetsbyhashtagCtrl');
  }));

  it('should do something', function () {
    expect(!!TweetsbyhashtagCtrl).toBe(true);
  });

});
