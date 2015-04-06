(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$http','$location','$route','DataService','AuthService',
        function ($scope,$log,$http,$location,$route,DataService,AuthService)
        {
            if(AuthService.isLogged())
            {
                var currentuser = AuthService.getUser();

                $scope.followingcount = currentuser.followingcount;
                $scope.followercount = currentuser.followercount;

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
            }
        }]);
})();
