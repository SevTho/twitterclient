'use strict';

describe('module: main, controller: GeotweetsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var GeotweetsCtrl;
  beforeEach(inject(function ($controller) {
    GeotweetsCtrl = $controller('GeotweetsCtrl');
  }));

  it('should do something', function () {
    expect(!!GeotweetsCtrl).toBe(true);
  });

});
