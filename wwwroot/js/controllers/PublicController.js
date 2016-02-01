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

            // catch event for reloading
            RealtimeService.onMessage(function (data) {
              ctrl.getData();
            });

            ctrl.getData();
        }
    ]);

})();
