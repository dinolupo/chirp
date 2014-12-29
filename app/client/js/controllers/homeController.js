var appControllers = angular.module('appControllers', []);

appControllers.controller('homeCtrl', ['$scope', '$log', '$http', 'config',
    function($scope, $log, $http, config) {

        $http.get( config.api+ "/home/antdimot").success( function(data) {
            $log.debug(data);

            $scope.chirps = data;
        });
    }
]);
