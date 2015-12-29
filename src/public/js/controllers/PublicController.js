(function() {
    'use strict';

    angular.module('appChirp')
        .controller('PublicController', ['$scope','$log','$timeout','DataService','RealtimeService','config',
        function ($scope,$log,$timeout,DataService,RealtimeService,config) {
            var ctrl = this;

            ctrl.getData = function(){
                DataService.getPublicPostList(
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            // catch event
            RealtimeService.onMessage(function (data) {
              ctrl.getData();
            });

            ctrl.getData();

            /*ctrl.intervalFunction = function()
            {
                ctrl.getData();

                var promise = $timeout(function(){
                    ctrl.getData();
                    ctrl.intervalFunction();
                }, config.elapsedtime);

                $scope.$on('$destroy', function(){
                    $timeout.cancel(promise);
                });
            };

            ctrl.intervalFunction();*/
        }
    ]);

})();
