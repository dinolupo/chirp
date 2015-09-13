(function() {
    'use strict';

    angular.module('appChirp')
        .controller('FollowingController', ['$scope', '$log', '$location','DataService','AuthService',
            function ($scope, $log, $location, DataService, AuthService) {
                var ctrl = this;

                ctrl.initView = function () {
                    DataService.getFollowingList(AuthService.getUser().username,
                        function (data) {
                            ctrl.users = data;
                        });
                };

                if(AuthService.isLogged()) {
                    ctrl.initView();
                }
                else
                {
                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                      AuthService.reloadUser(username, function(data)
                      {
                          if(data) {
                              ctrl.initView();
                          }
                      });
                  }
                }
            }
        ]);

})();
