(function() {
    'use strict';

    angular.module('chirp')
        .controller('FollowingCtrl', ['$scope', '$log', '$location','DataService','AuthService',
            function ($scope, $log, $location, DataService, AuthService)
            {
                $scope.initView = function ()
                {
                    DataService.getFollowingList(AuthService.getUser().username,
                        function (data) {
                            $scope.users = data;
                        });
                }

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
            }
        ]);

})();
