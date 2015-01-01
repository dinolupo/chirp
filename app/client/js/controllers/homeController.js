

appControllers.controller('homeCtrl', ['$scope', '$log', '$http', '$rootScope', '$location', 'config',
    function($scope, $log, $http, $rootScope, $location, config) {

        $scope.displayname = $rootScope.connectedUser.displayname;

        $scope.logout = function() {
            $rootScope.connectedUser = null;
            $location.path('/public');
        }

        var url = config.api+ "/home/" + $rootScope.connectedUser.username;

        $http.get(url).
            success( function(data) {
                $log.debug(data);
                $scope.chirps = data;
            }).
            error( function(data) {
                $log.error('Error on home request');
            });
    }
]);
