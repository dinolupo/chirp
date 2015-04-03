(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService)
        {
            var token = $cookies.chirp;

            if( token )
            {
                $log.debug(token);

                AuthService.reloadUser(token, function(data)
                {
                    $scope.username = (AuthService.isLogged() ? AuthService.getUser().displayname : '' );
                });
            }

            $scope.$on('logged', function() {
                $scope.username = AuthService.getUser().displayname;
            });
        }
    ]);

})();