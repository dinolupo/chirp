(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$http','$location','$timeout','$cookies','DataService','AuthService',
        function ($scope,$log,$http,$location,$timeout,$cookies,DataService,AuthService)
        {
            $scope.initView = function (){
                $scope.user = AuthService.getUser();
                $scope.send = function (message)
                {
                    DataService.sendMessage($scope.user.username, message, function (data)
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

                $scope.loadPosts = function getData() {
                    DataService.getHomePostList($scope.user.username,
                        function (data) {
                            $scope.posts = data;
                        });
                }

                $scope.loadPosts();
            }

            $scope.$on('logged', function() {
                $scope.initView();
            });

            if(AuthService.isLogged())
            {
                $scope.initView();
            }
            else
            {
                if( $cookies.chirp )
                {
                    AuthService.reloadUser($cookies.chirp, function(data)
                    {
                        if(data) {
                            $scope.initView();
                        }
                    });
                }
            }
        }]);
})();
