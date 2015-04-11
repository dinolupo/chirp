(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService)
        {
            $scope.initViewAsLogged = function ()
            {
                $scope.user = AuthService.getUser();
                $scope.islogged = true;

                $scope.logout = function() {
                    AuthService.logout();
                    $scope.user = null;
                    delete $cookies.chirp;
                    $scope.islogged = false;

                    $location.path('/public');
                    $location.replace();

                    $scope.$emit('logout');
                };
            };

            $scope.$on('logged', function() {
                $scope.initViewAsLogged();
            });

            if(AuthService.isLogged())
            {
                $scope.initViewAsLogged();
            }
            else
            {
                $scope.islogged = false;

                if( $cookies.chirp )
                {
                    AuthService.reloadUser($cookies.chirp, function(data)
                    {
                        if(data)
                        {
                            $scope.initViewAsLogged();
                        }
                    });
                }
            }
        }
    ]);

})();