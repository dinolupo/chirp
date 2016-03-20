(function() {
    'use strict';

    angular.module('appChirp')
        .controller('PublicController', ['$scope','$log','$timeout','DataService','RealtimeService',
        function ($scope,$log,$timeout,DataService,RealtimeService) {
            var ctrl = this;

            ctrl.loadPosts = function() {
                DataService.getPublicPostList(
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            // catch event for reloading
            RealtimeService.onMessage(function () {
                ctrl.loadPosts();
            });
            
            // load the public posts
            ctrl.loadPosts();
        }
    ]);

})();
