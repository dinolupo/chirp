(function() {
    'use strict';

    angular.module('chirp')
        .controller('FollowingCtrl', ['$scope', '$log', '$http', '$location','DataService',
            function ($scope, $log, $http, $location, DataService)
            {
                var currentuser = $scope.$parent.user;
                if (currentuser)
                {
                    DataService.getFollowingList(currentuser.username,
                        function (data) {
                            $scope.users = data;
                        });
                }
            }
        ]);

})();
