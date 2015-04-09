(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService)
        {
            $scope.$on('logged', function() {
                $scope.displayname = AuthService.getUser().displayname;
                $scope.islogged = true;
            });

            var token = $cookies.chirp;
            if( token )
            {
                AuthService.reloadUser(token, function(data)
                {
                    if(data)
                    {
                        $scope.islogged = true;
                        $scope.$broadcast('logged');
                        //$scope.$emit('logged');
                    }
                });
            }
            else {
                $scope.islogged = false;
            }

            $scope.$on('logout', function() {
                AuthService.logout();
                delete $cookies.chirp;

                $scope.islogged = false;

                $location.path('/public');
                $location.replace();
            });

            $scope.logout = function() {
                $scope.$emit('logout');
            };
        }
    ]);

})();