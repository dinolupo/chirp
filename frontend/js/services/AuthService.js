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
                                $log.debug(data);
                                if(data.result==1)
                                {
                                    _authUser = data.user;
                                    callBack(_authUser.username);
                                }
                                else callBack();
                            }
                            else callBack();
                        }
                    )
                },
                logout: function() {
                    _authUser = null;
                },
                isLogged: function() {
                    if(_authUser)
                    {
                        return true;
                    }
                    return false;
                },
                getUser: function()
                {
                    return _authUser;
                }
            }
        }]);

})();