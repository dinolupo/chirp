(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$rootScope','$log','$http','$location','$timeout','$route','DataService',
        function ($scope,$rootScope,$log,$http,$location,$timeout,$route,DataService)
        {
            var currentuser = $scope.$parent.user;
            if (currentuser)
            {
                $scope.followingcount = currentuser.followingcount;
                $scope.followercount = currentuser.followercount;

                $scope.getData = function getData() {
                    DataService.getHomePostList(currentuser.username,
                        function (data) {
                            $scope.posts = data;
                        });
                }

                $scope.send = function (message)
                {
                    DataService.sendMessage(currentuser.username, message, function (data)
                    {
                        if (data.result == 1)
                        {
                            alert('Message sent!');
                            $route.reload();
                        }
                        else {
                            alert('The message has not been sent!');
                        }
                    });
                }

                $scope.getData();
            }

            /*$scope.intervalFunction = function () {
                $scope.getData();
                $timeout(function () {
                    $scope.intervalFunction();
                }, config.elapsedtime)
            };
            $scope.intervalFunction();*/


        }]);
})();
