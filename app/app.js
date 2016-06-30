'use strict';

// Declare app level module which depends on views, and components
angular.module('calculator', [
  'ngRoute',
  'calculator.view',
  'btford.socket-io'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});
}]).
factory('io', function (socketFactory) {
  return socketFactory();
});