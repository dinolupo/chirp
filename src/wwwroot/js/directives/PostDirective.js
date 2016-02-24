(function() {
    'use strict';

    angular.module('appChirp')
        .directive("post",['$log','DataService','RealtimeService','AuthService',
        function ($log,DataService,RealtimeService,AuthService)
        {
          return {
            restrict: 'E',
            templateUrl: 'partials/templates/post-directive-template.html',
            replace: false,
            scope: {
              data: '=post',
              logged: '='
            },
            controller: function () {
              var ctrl = this;
              ctrl.repost = function (postid) {
                  var username = AuthService.getUser().username; // get current user
                  //$log.debug('Repost: ' + username );
                  DataService.repost(username,postid, function (result) {
                    if(result) {
                      RealtimeService.postMessage(username); // emit event
                    }
                    else {
                      alert('Cannot repost!');
                    }
                  });
              };
            },
            controllerAs: 'vm'
          };
        }]);
})();
