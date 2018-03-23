app.factory('actorsService', function($log, $http, $q) {

    var actors = [];
    var wasEverLoaded = false;
  

  
    function load() {
      var async = $q.defer();
  
      // Checking if the cars was ever loaded
      if (wasEverLoaded) {
        // Immediatly resolving the promise since cars is already available
        async.resolve();
      } else {
        // Loading the data from JSON
        $http.get("cars.json").then(function(response) {
          // on success
          //cars = [];
          cars.splice(0,cars.length)
          $log.debug("CARAPP: " + JSON.stringify(response));
          for (var i = 0; i < response.data.length; i++) {
            cars.push(new Car(response.data[i].brand, response.data[i].model, response.data[i].year, response.data[i].km, response.data[i].testDate));
          }
          wasEverLoaded = true;
          async.resolve();
          
        }, function(response) {
          // on failure
          $log.error("CARAPP: " + JSON.stringify(response));
          async.reject();
        });
      }
  
      return async.promise;
    }
    
    // function addCar(brand, model, year, km, testDate) {
    //   var car = new Car(brand, model, year, km, testDate);
    //   cars.push(car);
    // }
  
  
  
  
    return {
      actors: actors,
      load: load,
    //   addCar: addCar
    }
  
  })