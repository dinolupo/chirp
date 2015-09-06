(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService) {
              var ctrl = this;

              ctrl.initViewAsLogged = function () {
                  ctrl.user = AuthService.getUser();
                  ctrl.islogged = true;

                  ctrl.logout = function () {
                      AuthService.logout();

                      ctrl.user = null;
                      delete $cookies.chirp;
                      ctrl.islogged = false;

                      $location.path('/pubic');
                      $location.replace();

                      $scope.$emit('logout');
                  };
              };

              $scope.$on('logged', function () {
                  ctrl.initViewAsLogged();
              });

              if(AuthService.isLogged())
              {
                  ctrl.initViewAsLogged();
              }
              else
              {
                  ctrl.islogged = false;

                  if( $cookies.chirp )
                  {
                      AuthService.reloadUser($cookies.chirp, function (data) {
                          if(data)
                          {
                              ctrl.initViewAsLogged();
                          }
                      });
                  }
              }
            }
    ]);

})();
