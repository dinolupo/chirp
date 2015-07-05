(function() {
    'use strict';

    angular.module('chirp')
        .controller('RegisterCtrl', ['$scope', '$log', '$location', '$cookies', 'AuthService',
            function ($scope, $log, $location, $cookies, AuthService)
            {
                $scope.signin = function (profile) {
                    if(profile.password != profile.confirmpassword)
                    {
                        alert('Password are different!')
                    }
                    else
                    {
                        AuthService.signin(profile,function()
                        {
                            alert('User signed!');

                            $location.path('/public');
                            $location.replace();
                        });
                    }
                };
            }
        ]);

})();
