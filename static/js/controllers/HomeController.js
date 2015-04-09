(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$http','$location','$timeout','$route','DataService','AuthService','config',
        function ($scope,$log,$http,$location,$timeout,$route,DataService,AuthService,config)
        {
            $scope.$on('$routeChangeSuccess', function ()
            {
                var currentuser = AuthService.getUser();

                DataService.getHomePostList(currentuser.username,
                    function (data) {
                        $scope.posts = data;
                    });

                $scope.send = function(message)
                {
                    DataService.sendMessage(currentuser.username,message,function(data)
                    {
                        if(data.result==1)
                        {
                            alert('Message sent!');
                            $route.reload();
                        }
                        else
                        {
                            alert('Message is not send!');
                        }
                    });
                }

                $scope.followingcount = currentuser.followingcount;
                $scope.followercount = currentuser.followercount;

                $scope.intervalFunction = function(){
                    $scope.getData();
                    $timeout(function() {
                        $scope.intervalFunction();
                    }, config.elapsedtime)
                };

                $scope.intervalFunction();
            });

        }]);
})();
