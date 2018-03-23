// myApp.controller('exCtrl', ['$scope', function ($scope) {
// $scope.msg = 'This Must Work!';
myApp.controller("exCtrl", function ($scope, $http, $log) {
    function Actor(fname, lname, photo, imdbLink, bDate) {
        this.fname = fname;
        this.lname = lname;
        // this.selected = false;
        this.photo = photo;
        this.imdbLink = imdbLink;
        this.bDate = new Date(bDate);
        this.fullName = function () {
            return this.fname + " " + this.lname;
        }
    }

    //     $scope.orders = [
    //         {name:'fname', shade:'dark'},
    //         {name:'white', shade:'light', notAnOption: true},
    //         {name:'red', shade:'dark'},
    //         {name:'blue', shade:'dark', notAnOption: true},
    //         {name:'yellow', shade:'light', notAnOption: false}
    //       ];
    //     <select class="px-2" ng-model="orderProp" id="order1">
    //     <option value="fname">First name</option>
    //     <option value="lname">Last name</option>
    //     <option value="bDate">Birth Date</option>
    // </select>
    /*
        var actor1 = new Actor("Jack", "Nicholson",
            "https://ia.media-imdb.com/images/M/MV5BMTQ3OTY0ODk0M15BMl5BanBnXkFtZTYwNzE4Njc4._V1_UY317_CR7,0,214,317_AL_.jpg",
            "http://www.imdb.com/name/nm0000197/?ref_=nmls_pst",
            "04-22-1937");
        //  alert(JSON.stringify(actor1));
    
        var actor2 = new Actor("Dustin", "Hoffman",
            "https://ia.media-imdb.com/images/M/MV5BMTc3NzU0ODczMF5BMl5BanBnXkFtZTcwODEyMDY5Mg@@._V1_UY209_CR8,0,140,209_AL_.jpg",
            "http://www.imdb.com/name/nm0000163/?ref_=nmls_hd",
            "08-08-1937");
    
        var actor3 = new Actor("Paul", "Newman",
            "https://ia.media-imdb.com/images/M/MV5BODUwMDYwNDg3N15BMl5BanBnXkFtZTcwODEzNTgxMw@@._V1_UY317_CR22,0,214,317_AL_.jpg",
            "http://www.imdb.com/name/nm0000056/?ref_=nmls_hd",
            "01-26-1925");
    
        var actor4 = new Actor("Charles", "Chaplin",
            "https://ia.media-imdb.com/images/M/MV5BNDcwMDc0ODAzOF5BMl5BanBnXkFtZTgwNTY2OTI1MDE@._V1_UX214_CR0,0,214,317_AL_.jpg",
            "http://www.imdb.com/name/nm0000122/?ref_=nmls_hd",
            "12-25-1889");
        var actor5 = new Actor("Johnny", "Depp",
            "https://ia.media-imdb.com/images/M/MV5BMTM0ODU5Nzk2OV5BMl5BanBnXkFtZTcwMzI2ODgyNQ@@._V1_UY209_CR3,0,140,209_AL_.jpg",
            "http://www.imdb.com/name/nm0000136/?ref_=nmls_hd",
            "06-09-1963");
    
        var actor6 = new Actor("Robert", "Redford",
            "https://ia.media-imdb.com/images/M/MV5BMTk1Nzc5MzQyMV5BMl5BanBnXkFtZTcwNjQ5OTA0Mg@@._V1_UY209_CR5,0,140,209_AL_.jpg",
            "http://www.imdb.com/name/nm0000602/?ref_=nmls_hd",
            "08-18-1936");
    
    
    
        $scope.actors = [actor1, actor2, actor3, actor4, actor5, actor6];
    */
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
        //$scope.cars = response.data;
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
    // clearForm
    // Julia Roberts
    // https://ia.media-imdb.com/images/M/MV5BMTQzNjU3MDczN15BMl5BanBnXkFtZTYwNzY2Njc4._V1_UX214_CR0,0,214,317_AL_.jpg
    // http://www.imdb.com/name/nm0000210/?ref_=nv_sr_3
    // 10-28-1967
    //   this.fname = fname;
    //     this.lname = lname;
    //     this.photo = photo;
    //     this.imdbLink = imdbLink;
    //     this.bDate = new Date(bDate);
    //}]);
});