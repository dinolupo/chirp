(function() {
    'use strict';

    angular.module('chirp')
        .controller('PublicCtrl', [ '$log', '$http', '$timeout', 'DataService', 'config',
        function ( $log, $http, $timeout, DataService, config)
        {
            var ctrl = this;

            ctrl.getData = function(){
                DataService.getPublicPostList(
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            ctrl.getData();

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
