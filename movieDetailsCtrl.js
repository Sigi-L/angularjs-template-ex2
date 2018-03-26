
myApp.controller("movieDetailsCtrl", function ($scope, $routeParams, moviesService) {
  // alert($routeParams.mId);
  var indexToDisplay = parseInt($routeParams.mId);
  
  moviesService.load().then(function () {
    // alert(indexToDisplay);
    $scope.movie = moviesService.movies[indexToDisplay];
  })
  
  $scope.lengthStr = function (length) {
    return moviesService.lengthStr(length);
  }
})