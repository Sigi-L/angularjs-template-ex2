


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


 // Initializing searchText so it won't be undefined before the user enters text
 $scope.search3 = "";
 $scope.searchData3 = function (movie) {
     // Case insensitive search in model and brand properties
     return movie.name.toLowerCase().includes($scope.search3.toLowerCase()) ;
 }


 $scope.orderProp3 = "";
 $scope.changeSort3 = function (propName) {
     $scope.orderProp3 = propName;
 }

});