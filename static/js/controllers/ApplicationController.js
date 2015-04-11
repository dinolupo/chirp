(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','$rootScope','AuthService',
            function ($scope,$log,$location,$cookies,$rootScope,AuthService)
        {
            $scope.islogged = false;
            $scope.user = null;

            $scope.$on('logged', function() {
                $scope.user = AuthService.getUser();

                $scope.displayname = $scope.user.displayname;
                $scope.islogged = true;
            });

            var token = $cookies.chirp;
            if( token )
            {
                AuthService.reloadUser(token, function(data)
                {
                    if(data)
                    {
                        $scope.user = AuthService.getUser();

                        $scope.displayname = $scope.user.displayname;
                        $scope.islogged = true;

                        $rootScope.$broadcast('logged');
                    }
                });
            }

            $scope.logout = function() {
                AuthService.logout();
                $scope.user = null;
                delete $cookies.chirp;
                $scope.islogged = false;

                $location.path('/public');
                $location.replace();

                $rootScope.$broadcast('logout');
            };
        }
    ]);

})();