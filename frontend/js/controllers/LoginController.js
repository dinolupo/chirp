(function() {
    'use strict';

    angular.module('chirp')
        .controller('LoginCtrl', ['$scope', '$log', '$http', '$location', 'AuthService', 'DataService',
            function ($scope, $log, $http, $location, AuthService, DataService)
            {
                $scope.credentials = {
                    username: '',
                    password: ''
                };

            }
        ]);

})();
