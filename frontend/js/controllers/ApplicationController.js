(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService)
        {
            $scope.$on('logged', function() {
                $scope.username = (AuthService.isLogged() ? AuthService.getUser().displayname : '' );
                $scope.islogged = true;
            });

            $scope.$on('logout', function() {
                AuthService.logout();
                delete $cookies.chirp;

                $scope.username = '';
                $scope.islogged = false;

                $location.path('/public');
                $location.replace();
            });

            $scope.islogged = false;
            $scope.logout = function() {
                $scope.$emit('logout');
            }

            var token = $cookies.chirp;

            if( token )
            {
                AuthService.reloadUser(token, function(data)
                {
                    if(data)
                    {
                        $scope.$emit('logged');
                    }
                });
            }
        }
    ]);

})();