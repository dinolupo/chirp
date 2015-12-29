(function() {
    'use strict';

    angular.module('appChirp')
        .controller('AppController',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService) {
              var ctrl = this;

              ctrl.initViewAsLogged = function () {
                  ctrl.user = AuthService.getUser();
                  ctrl.islogged = true;
              };

              ctrl.logout = function () {
                  AuthService.logout();

                  ctrl.user = null;
                  $cookies.remove("chirp");
                  ctrl.islogged = false;

                  $location.path('/public');
                  $location.replace();

                  $scope.$emit('logout');
              };

              $scope.$on('logged', function () {
                  ctrl.initViewAsLogged();
              });

              if(AuthService.isLogged()) {
                  ctrl.initViewAsLogged();
              }
              else {
                  ctrl.islogged = false;

                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                      AuthService.reloadUser(username, function (data) {
                          if(data) {
                              ctrl.initViewAsLogged();
                          }
                      });
                  }
              }
            }
    ]);

})();
