(function() {
    'use strict';

    angular.module('chirp')
        .controller('LoginCtrl', ['$scope', '$log', '$location', '$cookies', '$rootScope', 'AuthService',
            function ($scope, $log, $location, $cookies, $rootScope, AuthService)
            {
                $scope.credentials = {
                    username: '',
                    password: ''
                };

                $scope.login = function (credentials) {
                    AuthService.login(credentials,function (username)
                    {
                        if(username)
                        {
                            $cookies.chirp = username;

                            $location.path('/home');
                            $location.replace();

                            $rootScope.$broadcast('logged');
                        }
                        else {
                            alert('Wrong credentials!');
                        }
                    });
                };
            }
        ]);

})();
