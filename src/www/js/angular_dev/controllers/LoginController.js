(function() {
    'use strict';

    angular.module('chirp')
        .controller('LoginCtrl', ['$log', '$location', '$cookies', '$rootScope', 'AuthService',
            function ($log, $location, $cookies, $rootScope, AuthService) {
                var vm = this;

                vm.credentials = {
                    username: '',
                    password: ''
                };

                vm.login = function (credentials) {
                    AuthService.login(credentials, function (username) {
                        $log.debug(username);

                        if(username!==undefined)
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
