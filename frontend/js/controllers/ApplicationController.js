(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','DataService',
            function ($scope,$log,DataService)
        {
            var currentUser = null;

            $scope.setCurrentUser = function (user) {
                currentUser = user;
            };

            $scope.isLogged = function () {
                return (currentUser != null);
            }

            $scope.getUserDisplayName = function () {
                if (currentUser != null) {
                    return currentUser.displayName;
                }
                else {
                    return "";
                }
            }
        }
    ]);

})();