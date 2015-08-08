(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$location','$timeout','$cookies','DataService','AuthService','config',
        function ($scope,$log,$location,$timeout,$cookies,DataService,AuthService,config)
        {
            var ctrl = this;

            ctrl.initView = function ()
            {
                ctrl.user = AuthService.getUser();
                ctrl.message = '';

                ctrl.send = function (message)
                {
                    DataService.sendMessage(ctrl.user.username, message, function (data)
                    {
                        if (data.result)
                        {
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

            ctrl.intervalFunction = function()
            {
                ctrl.loadPosts();

                var promise = $timeout(function(){
                    ctrl.loadPosts();
                    ctrl.intervalFunction();
                }, config.elapsedtime);

                $scope.$on('$destroy', function(){
                    $timeout.cancel(promise);
                });
            };

            ctrl.intervalFunction();
        }]);
})();
