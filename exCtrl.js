// myApp.controller('exCtrl', ['$scope', function ($scope) {
// $scope.msg = 'This Must Work!';
myApp.controller("exCtrl", function ($scope, $http, $log) {
    function Actor(fname, lname, photo, imdbLink, bDate) {
        this.fname = fname;
        this.lname = lname;

        this.photo = photo;
        this.imdbLink = imdbLink;
        this.bDate = new Date(bDate);
        this.fullName = function () {
            return this.fname + " " + this.lname;
        }
    }


    function ActorObj(actor) {
        this.fname = actor.fname;
        this.lname = actor.lname;
        // this.selected = false;
        this.photo = actor.photo;
        this.imdbLink = actor.imdbLink;
        this.bDate = new Date(actor.bDate);
        this.fullName = function () {
            return this.fname + " " + this.lname;
        }
    }
    $scope.actors = [];
    $http.get("actors.json").then(function (response) {
        // on success
        $log.debug("CARAPP: " + JSON.stringify(response));
        for (var i = 0; i < response.data.length; i++) {
            $scope.actors.push(new ActorObj(response.data[i]));
        }
    }, function (response) {
        // on failure
        $log.error("CARAPP: " + JSON.stringify(response));
        alert("error: " + response)
    });

    // Initializing searchText so it won't be undefined before the user enters text
    $scope.search1 = "";
    $scope.search2 = "";

    $scope.searchData = function (actor) {
        // Case insensitive search in model and brand properties

        var namefilter = actor.fname.toLowerCase().includes($scope.search1.toLowerCase()) ||
            actor.lname.toLowerCase().includes($scope.search1.toLowerCase());
        var datefilter = true;
        if ($scope.search2 !== "") {
            if ((actor.bDate.getMonth() + 1).toString() !== ($scope.search2)) {
                datefilter = false;
            }
        }
        return (namefilter && datefilter);
    }


    $scope.orderProp = "";
    $scope.changeSort = function (propName) {
        $scope.orderProp = propName;
    }


    $scope.addActor = function () {
        var newActorObj = new Actor($scope.newActor.fname, $scope.newActor.lname,
            $scope.newActor.photo, $scope.newActor.imdbLink, new Date($scope.newActor.bDate));

        $scope.actors.push(newActorObj);
    };
    $scope.clearForm = function () {
        $scope.newActor.fname = "";
        $scope.newActor.lname = "";
        $scope.newActor.photo = "";
        $scope.newActor.imdbLink = "";
        $scope.newActor.bDate = "";
    };

    $scope.selectedActor = null;
    $scope.toggleActorSelected = function (actor) {
        if ($scope.selectedActor === actor) {
            $scope.selectedActor = null;
        } else {
            $scope.selectedActor = actor;
        }
        // actor.selected = !actor.selected;
    }

});