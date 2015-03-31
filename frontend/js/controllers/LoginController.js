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
                        function (result) {
                            if(result) {
                                //$location.path('/home/' + credentials.username);
                                //$location.replace();
                            }
                            else {
                                alert('Wrong credentials!');
                            }
                        });
                };
            }
        ]);

})();
