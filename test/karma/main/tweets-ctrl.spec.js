'use strict';

describe('module: main, controller: TweetsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var TweetsCtrl;
  beforeEach(inject(function ($controller) {
    TweetsCtrl = $controller('TweetsCtrl');
  }));

  it('should do something', function () {
    expect(!!TweetsCtrl).toBe(true);
  });

});
