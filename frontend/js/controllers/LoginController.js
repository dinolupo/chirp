(function() {
    'use strict';

    angular.module('chirp')
        .controller('LoginCtrl', ['$scope', '$log', '$location', 'AuthService',
            function ($scope, $log, $location, AuthService)
            {
                $scope.credentials = {
                    username: '',
                    password: ''
                };

                $scope.login = function (credentials) {
                    AuthService.login(credentials,
                        function (username) {
                            if(username) {
                                $location.path('/home/' + username);
                                $location.replace();

                                $scope.$emit('logged');
                            }
                            else {
                                alert('Wrong credentials!');
                            }
                        });
                };
            }
        ]);

})();
