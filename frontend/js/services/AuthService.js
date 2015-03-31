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
                                if(data.result==1)
                                {
                                    _authUser = data.user;
                                    $log(data);
                                    callBack(true);
                                }
                                else callBack(false);
                            }
                            else callBack(false);
                        }
                    )

                },
                logout: function() {
                    _authUser = null;
                },
                isLogged: function() {
                    if(_authUser == null)
                    {
                        return false;
                    }
                    return true;
                },
                getUser: function()
                {
                    return _authUser;
                }
            }
        }]);

})();