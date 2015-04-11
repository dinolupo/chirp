(function() {
    'use strict';

    angular.module('chirp')
        .controller('FollowersCtrl', ['$scope', '$log', '$http', '$location','DataService',
            function ($scope, $log, $http, $location, DataService)
            {
                var currentuser = $scope.$parent.user;
                if (currentuser)
                {
                    DataService.getFollowersList(currentuser.username,
                        function (data) {
                            $scope.users = data;
                        });
                }
            }
        ]);

})();
