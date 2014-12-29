
appControllers.controller('publicCtrl', ['$scope', '$log', '$http', 'config',
    function($scope, $log, $http, config) {

        $http.get( config.api+ "/public").success( function(data) {
            $log.debug(data);

            $scope.chirps = data;
        });
    }
]);
