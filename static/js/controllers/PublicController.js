(function() {
    'use strict';

    angular.module('chirp')
        .controller('PublicCtrl', ['$scope', '$log', '$http', '$timeout', '$location','DataService',
        function ($scope, $log, $http, $timeout, $location, DataService)
        {
            $scope.getData = function(){
                DataService.getPublicPostList(
                    function (data) {
                        $scope.posts = data;
                    });
            };

            $scope.intervalFunction = function(){
                $timeout(function() {
                    $scope.getData();
                    $scope.intervalFunction();
                }, 5000)
            };

            $scope.getData();

            $scope.intervalFunction();
        }
    ]);

})();
