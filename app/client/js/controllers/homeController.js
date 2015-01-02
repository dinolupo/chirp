
appControllers.controller('HomeCtrl', ['$scope', '$log', '$http', '$rootScope', '$location', '$routeParams',
    'DataService','config',
    function($scope, $log, $http, $rootScope, $location, $routeParams, DataService, config) {

        //$scope.displayname = $rootScope.connectedUser.displayname;

        $scope.logout = function() {

        }

        DataService.getHomeChirps($routeParams.username,
            function(data){
                $scope.chirps = data;
            },
            function(data){
                alert('Error on retrieving chirps data.');
            });
    }
]);
