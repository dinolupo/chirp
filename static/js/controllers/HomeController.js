(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$http','$location','$timeout','$cookies','DataService','AuthService',
        function ($scope,$log,$http,$location,$timeout,$cookies,DataService,AuthService)
        {
            var ctrl = this;

            ctrl.initView = function ()
            {
                ctrl.user = AuthService.getUser();
                ctrl.send = function (message)
                {
                    DataService.sendMessage(ctrl.user.username, message, function (data)
                    {
                        if (data.result)
                        {
                            alert('Message sent!');
                        }
                        else {
                            alert('The message has not been sent!');
                        }
                    });
                }

                ctrl.loadPosts = function getData() {
                    DataService.getHomePostList(ctrl.user.username,
                        function (data) {
                            ctrl.posts = data;
                        });
                }
                ctrl.loadPosts();
            }

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
        }]);
})();
