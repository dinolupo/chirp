(function() {
    'use strict';

    angular.module('chirp')
        .factory("AuthService", ['$http', '$log', 'config', 'DataService',
        function ($http, $log, config, DataService)
        {
            var _authUser = null;

            return {
                login: function (credentials,callBack)
                {
                    var username = credentials.username;
                    var password = credentials.password;

                    DataService.getUserByCredentials(username,password,
                        function(data) {
                            if(data)
                            {
                                $log.debug("[%s] DataService.getUserByCredential > %s",new Date().toISOString(),data.username);
                                _authUser = data;
                                callBack(_authUser.username);
                            }
                            else callBack();
                        }
                    )
                },
                logout: function() {
                    $log.debug("[%s] DataService.logout > %s",new Date().toISOString(),_authUser.username);
                    _authUser = null;
                },
                getUser: function()
                {
                    return _authUser;
                },
                isLogged: function(){
                    return (_authUser!=null);
                },
                reloadUser: function(token,callBack)
                {
                    DataService.getUserByToken(token,
                        function(data) {
                            if(data)
                            {
                                $log.debug("[%s] DataService.reloadUser > %s",new Date().toISOString(),data.username);
                                _authUser = data;
                                callBack(_authUser.username);
                            }
                            else callBack();
                        }
                    )
                },
                signin: function (profile,callBack)
                {
                    var username = profile.username;
                    var displayname = profile.displayname;
                    var email = profile.email;
                    var password = profile.password;

                    DataService.register(username,displayname,email,password,
                        function() {
                            $log.debug("[%s] DataService.signin > %s",new Date().toISOString(),data.username);
                            callBack();
                        }
                    );
                }
            }
        }]);

})();