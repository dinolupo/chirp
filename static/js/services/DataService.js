(function() {
    'use strict';

    angular.module('chirp')
        .factory("DataService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            var dataServiceErrorHandler = function()
            {
                $log.error("Backend connection problems.");
            };

            return {
                getPublicPostList: function (callBack) {
                    $http.get(config.api + "/post/public")
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(dataServiceErrorHandler);
                },
                getHomePostList: function (username,callBack) {
                    $http.get(config.api + "/post/home/" + username)
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(dataServiceErrorHandler);
                },
                getUserByCredentials: function (username,password,callBack)
                {
                    $http.get(config.api + "/user/authenticate/" + username + "/" + password )
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(dataServiceErrorHandler);
                },
                getUserByToken: function (token,callBack) {
                    $http.get(config.api + "/user/access/" + token)
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(dataServiceErrorHandler);
                },
                sendMessage: function(username,text,callBack){
                    $http.post(config.api + "/post",{"username":username,"text":text})
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(dataServiceErrorHandler);
                }
            }
        }]);

})();
