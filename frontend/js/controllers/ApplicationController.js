(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','DataService','AuthService',
            function ($scope,$log,DataService,AuthService)
        {
            $scope.username = (AuthService.isLogged() ? AuthService.getUser().displayname : '' );

            $scope.$on('logged', function() {
                $scope.username = AuthService.getUser().displayname;
            });
        }
    ]);

})();