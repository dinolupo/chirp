(function() {
    'use strict';

    angular.module('chirp')
        .factory("DataService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            return {
                getPublicPostList: function (callBack) {
                    $http.get(config.api + "/post/public")
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                },
                getHomePostList: function (username,callBack) {
                    $http.get(config.api + "/post/home/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                },
                getUserByCredentials: function (username,password,callBack)
                {
                    $http.get(config.api + "/user/authenticate/" + username + "/" + password )
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                },
                getUserByToken: function (token,callBack) {
                    $http.get(config.api + "/user/access/" + token)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                },
                sendMessage: function(username,text,callBack){
                    $http.post(config.api + "/post",{"username":username,"text":text})
                        .success(function (data, status, headers, config)  {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                }
            }
        }]);

})();
