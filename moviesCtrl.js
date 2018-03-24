


myApp.controller("moviesCtrl", function ($scope, $http, $log, moviesService) {

    // Putting the service object available for the HTML
    // $scope.moviesService = moviesService;

    $scope.lengthStr = function(length) {
       return moviesService.lengthStr(length);
      }


    // Loading data from JSON
    $scope.movies = [];
    moviesService.load().then(function () {
        $scope.movies = moviesService.movies;
    })

});