'use strict';
angular.module('main').filter('StringToDate', function ()
{
  return function (input)
  {
    var _date = new Date(input);
    return _date;
  };
});
