

appControllers.controller('homeCtrl', ['$scope', '$log', '$http', '$rootScope', 'config',
    function($scope, $log, $http, $rootScope, config) {
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
