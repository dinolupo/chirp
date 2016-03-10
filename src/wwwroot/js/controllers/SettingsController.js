(function() {
    'use strict';

    angular.module('appChirp')
        .controller('SettingsController', ['$scope','$log','$stateParams','AuthService','DataService',
            function ($scope,$log,$stateParams,AuthService,DataService) {
                var ctrl = this;

                ctrl.initView = function ()
                {
                    ctrl.user = AuthService.getUser();
                };
                
                if(AuthService.isLogged())
                {
                    ctrl.initView();
                }
                else
                {
                    if( $cookies.chirp )
                    {
                        AuthService.reloadUser($cookies.chirp, function(data)
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