'use strict';
angular.module('twitclient6', [
  // load your modules here
  'main',
  'pascalprecht.translate'
]).config(function ($translateProvider) {
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.useStaticFilesLoader({
    prefix: 'main/assets/i18n/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
});
