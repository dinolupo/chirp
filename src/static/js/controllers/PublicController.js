(function() {
    'use strict';

    angular.module('chirp')
        .controller('PublicCtrl', ['$scope','$log','$timeout','DataService','config',
        function ($scope, $log, $timeout, DataService, config)
        {
            var ctrl = this;

            ctrl.getData = function(){
                DataService.getPublicPostList(
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            ctrl.intervalFunction = function()
            {
                ctrl.getData();

                var promise = $timeout(function(){
                    ctrl.getData();
                    ctrl.intervalFunction();
                }, config.elapsedtime)

                $scope.$on('$destroy', function(){
                    $timeout.cancel(promise);
                });
            };

            ctrl.intervalFunction();
        }
    ]);

})();
