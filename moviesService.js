myApp.factory('moviesService', function ($log, $http, $q) {

    var movies = [];
    var wasEverLoaded = false;


    function Movie(name, length, stars, director, imdbLink) {
        this.name = name;
        this.length = length;

        this.stars = stars;
        this.director = director;
        this.imdbLink = imdbLink;
        // this.lengthStr = function () {
        //     return (Math.floor(this.length / 60) + "h " + this.length % 60 + "m");
        // }
    }

    function MovieObj(movie) {
        return new Movie(movie.name, movie.length, movie.stars, movie.director, movie.imdbLink);
    }

    function lengthStr(length) {
        // var srt = Math.floor(length / 60) + "h " + length % 60 + "m";
        return Math.floor(length / 60) + "h " + length % 60 + "m";
    }


    function load() {
        var async = $q.defer();

        // Checking if the cars was ever loaded
        if (wasEverLoaded) {
            // Immediatly resolving the promise since movies is already available
            async.resolve();
        } else {
            // Loading the data from JSON
            $http.get("movies.json").then(function (response) {
                // on success
                //movies = [];
                movies.splice(0, movies.length)
                $log.debug("CARAPP: " + JSON.stringify(response));
                for (var i = 0; i < response.data.length; i++) {
                    movies.push(new MovieObj(response.data[i]));
                }
                wasEverLoaded = true;
                async.resolve();

            }, function (response) {
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
        movies: movies,
        lengthStr: lengthStr,
        load: load

        //   addCar: addCar
    }

})