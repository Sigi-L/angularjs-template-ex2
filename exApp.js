var myApp = angular.module('myApp',  ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "actors.html",
        controller: "exCtrl"
      }).when ("/actors", {
        templateUrl: "actors.html",
        controller: "exCtrl"
      }).when("/movies", {
        templateUrl: 'movies.html',
        controller: 'moviesCtrl'
      })
      .otherwise({
        redirectTo: "/"
      })
  });