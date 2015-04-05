(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$http','$location','$route','$routeParams','DataService',
        function ($scope,$log,$http,$location,$route,$routeParams,DataService)
        {
            $scope.followingcount = $scope.$parent.followingcount;

            DataService.getHomePostList($routeParams.username,
                function (data) {
                    $scope.posts = data;
                });

            $scope.send = function(message)
            {
                var username = $scope.$parent.username;

                DataService.sendMessage(username,message,function(data){
                    if(data.result==1)
                    {
                        alert('Message sended!');

                        $route.reload();
                    }
                    else
                    {
                        alert('Message is not send!');
                    }
                });
            }
        }
        ]);

})();
