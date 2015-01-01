
appControllers.controller('publicCtrl', ['$scope', '$log', '$http', '$location', '$rootScope', 'config',
    function($scope, $log, $http, $location, $rootScope, config) {

        $scope.authenticate = function(user) {
            var username = user.username;
            var password = user.password;

            var url = config.api+ "/authenticate";

            $http.post( url, { username: username, password: password }).
                success(function(data) {
                    $log.debug('success on post request');
                    $rootScope.connectedUser = data;
                    $location.path('/home');
                }).
                error(function(data){
                    $log.error('error on post request');
                    alert('The credentials are not valid!')
                });
        };

        $http.get( config.api+ "/public").success( function(data) {
            $log.debug(data);

            $scope.chirps = data;
        });
    }
]);
