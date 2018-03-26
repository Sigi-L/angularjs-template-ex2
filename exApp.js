var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
      controller: "homeCtrl"
    }).when("/actors", {
      templateUrl: "actors.html",
      controller: "exCtrl"
    }).when("/movies", {
      templateUrl: 'movies.html',
      controller: 'moviesCtrl'
    }).when("/movies/:mId", {
      templateUrl: 'movie-details.html',
      controller: 'movieDetailsCtrl'
    })
    .otherwise({
      redirectTo: "/"
    })
});


