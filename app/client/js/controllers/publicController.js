
appControllers.controller('publicCtrl', ['$scope', '$log', '$http', '$location', '$rootScope', 'config',
    function($scope, $log, $http, $location, $rootScope, config) {

        $scope.authenticate = function() {
            var url = config.api+ "/authenticate";
            var username = $scope.loginform.username;
            var password = $scope.loginform.password;

            $http.post( url, { username: username, password: password }).
                success(function(data) {
                    $log.debug('success on post request');
                    $rootScope.connectedUser = data;
                    $location.path('/home');
                }).
                error(function(data){
                    $log.error('error on post request');
                    alert('Credentials are not valid!')
                });
        };

        $http.get( config.api+ "/public").success( function(data) {
            $log.debug(data);

            $scope.chirps = data;
        });
    }
]);
