(function() {
    'use strict';

    angular.module('chirp')
        .controller('InfoCtrl', ['$scope','$log','$stateParams','$cookies','AuthService','DataService',
            function ($scope,$log,$stateParams,$cookies,AuthService,DataService)
            {
                var ctrl = this;

                ctrl.getData = function(){
                    DataService.getUserInfo($stateParams.username,
                        function (data) {
                            ctrl.user = data;
                        });
                };

                ctrl.checkCanFollow = function()
                {
                    ctrl.canFollow = true;
                    ctrl.username = AuthService.getUser().username;

                    DataService.getFollowingList(ctrl.username,function(data)
                    {
                        if(data)
                        {
                            data.forEach(function(item, index, array){
                                if(item.username == $stateParams.username)
                                {
                                    ctrl.canFollow = false;
                                }
                            });
                        }
                    })
                };

                ctrl.getData();
                ctrl.showButton = false;

                if(AuthService.isLogged())
                {
                    if(AuthService.getUser().username != $stateParams.username) {
                        ctrl.showButton = true;
                        ctrl.checkCanFollow();
                    }
                }
                else
                {
                    if( $cookies.chirp )
                    {
                        if($cookies.chirp != $stateParams.username) {
                            AuthService.reloadUser($cookies.chirp, function(data)
                            {
                                if(data) {
                                    ctrl.showButton = true;
                                    ctrl.checkCanFollow();
                                }
                            });
                        }
                    }
                }


            }
        ]);

})();
