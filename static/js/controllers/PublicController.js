(function() {
    'use strict';

    angular.module('chirp')
        .controller('PublicCtrl', ['$scope', '$log', '$http', '$location','DataService',
        function ($scope, $log, $http, $location, DataService)
        {
            DataService.getPublicPostList(
                function (data) {
                    $scope.posts = data;
                });
        }
    ]);

})();
