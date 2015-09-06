(function() {
    'use strict';

    angular.module('chirp')
           .directive("postpanel", function () {
            return {
                restrict: 'E',
                templateUrl: "partials/templates/post-template.html",
                replace: true,
                scope: {
                    post: '=data'
                }
            };
    });

})();
