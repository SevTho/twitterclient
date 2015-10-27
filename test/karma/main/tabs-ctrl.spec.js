'use strict';

describe('module: main, controller: TabsCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var TabsCtrl;
  beforeEach(inject(function ($controller) {
    TabsCtrl = $controller('TabsCtrl');
  }));

  it('should do something', function () {
    expect(!!TabsCtrl).toBe(true);
  });

});
