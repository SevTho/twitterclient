'use strict';

describe('module: main, controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var AboutCtrl;
  beforeEach(inject(function ($controller) {
    AboutCtrl = $controller('AboutCtrl');
  }));

  it('should do something', function () {
    expect(!!AboutCtrl).toBe(true);
  });

});
