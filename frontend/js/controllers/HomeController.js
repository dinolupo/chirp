(function() {
    'use strict';

    angular.module('chirp')
        .controller('HomeCtrl', ['$scope','$log','$http','$location','$routeParams','DataService',
            function ($scope,$log,$http,$location,$routeParams,DataService)
            {
                DataService.getHomePostList($routeParams.username,
                    function (data) {
                        $scope.posts = data;
                    });
            }
        ]);

})();
