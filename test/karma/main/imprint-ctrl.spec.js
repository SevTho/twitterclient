'use strict';

describe('module: main, controller: ImprintCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ImprintCtrl;
  beforeEach(inject(function ($controller) {
    ImprintCtrl = $controller('ImprintCtrl');
  }));

  it('should do something', function () {
    expect(!!ImprintCtrl).toBe(true);
  });

});
