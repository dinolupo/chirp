(function() {
    'use strict';

    angular.module('chirp')
        .controller('FollowingCtrl', ['$scope', '$log', '$http', '$location','DataService','AuthService',
            function ($scope, $log, $http, $location, DataService, AuthService)
            {
                if(AuthService.isLogged()) {
                    var currentuser = AuthService.getUser();

                    DataService.getFollowingList(currentuser.username,
                        function (data) {
                            $scope.users = data;
                        });
                }

            }
        ]);

})();
