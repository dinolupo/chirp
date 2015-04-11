(function() {
    'use strict';

    angular.module('chirp')
        .controller('PublicCtrl', ['$scope', '$log', '$http', '$timeout', 'DataService', 'config',
        function ($scope, $log, $http, $timeout, DataService, config)
        {
            $scope.getData = function(){
                DataService.getPublicPostList(
                    function (data) {
                        $scope.posts = data;
                    });
            };

            $scope.getData();

            /*$scope.intervalFunction = function(){
                $scope.getData();
                $timeout(function() {
                    $scope.intervalFunction();
                }, config.elapsedtime)
            };*/

            //$scope.intervalFunction();
        }
    ]);

})();
