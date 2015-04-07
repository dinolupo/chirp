(function() {
    'use strict';

    angular.module('chirp')
        .controller('FollowersCtrl', ['$scope', '$log', '$http', '$location','DataService','AuthService',
            function ($scope, $log, $http, $location, DataService, AuthService)
            {
                if(AuthService.isLogged()) {
                    var currentuser = AuthService.getUser();

                    DataService.getFollowersList(currentuser.username,
                        function (data) {
                            $scope.users = data;
                        });
                }

            }
        ]);

})();
