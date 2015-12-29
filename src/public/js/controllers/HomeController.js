(function() {
    'use strict';

    angular.module('appChirp')
        .controller('HomeController', ['$scope','$log','$location','$timeout','$cookies',
        'DataService','AuthService','RealtimeService','config',
        function ($scope,$log,$location,$timeout,$cookies,DataService,AuthService,RealtimeService,config) {
            var ctrl = this;

            ctrl.initView = function ()
            {
                ctrl.user = AuthService.getUser();
                ctrl.message = '';
            };

            ctrl.send = function (message)
            {
                DataService.sendMessage(ctrl.user.username, message, function (result)
                {
                    if( result )
                    {
                        RealtimeService.postMessage(ctrl.user.username); // emit event

                        alert('Message sent!');
                        ctrl.message = '';
                    }
                    else {
                        alert('The message has not been sent!');
                    }
                });
            };

            ctrl.loadPosts = function getData() {
                DataService.getHomePostList(ctrl.user.username,
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            $scope.$on('logged', function() {
                ctrl.initView();
            });

            if(AuthService.isLogged())
            {
                ctrl.initView();
            }
            else
            {
                if( $cookies.chirp )
                {
                    AuthService.reloadUser($cookies.chirp, function(data)
                    {
                        if(data) {
                            ctrl.initView();
                        }
                    });
                }
            }

            // catch event for reloading
            RealtimeService.onMessage(function (data) {
              ctrl.loadPosts();
            });

            ctrl.loadPosts();
        }]);
})();
