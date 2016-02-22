(function() {
    'use strict';

    angular.module('appChirp')
        .directive("post",[function ()
        {
          return {
            restrict: 'E',
            templateUrl: 'partials/templates/post-directive-template.html',
            replace: false,
            scope: {
              data: '=post'
            }
          };
        }]);
})();
