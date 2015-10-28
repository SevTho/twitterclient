'use strict';

describe('module: main, controller: NetworkCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var NetworkCtrl;
  beforeEach(inject(function ($controller) {
    NetworkCtrl = $controller('NetworkCtrl');
  }));

  it('should do something', function () {
    expect(!!NetworkCtrl).toBe(true);
  });

});
