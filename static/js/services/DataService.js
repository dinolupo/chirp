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
                },
                getFollowingList: function (username,callBack) {
                    $http.get(config.api + "/user/following/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                },
                getFollowersList: function (username,callBack) {
                    $http.get(config.api + "/user/followers/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        })
                },
                register: function(username,displayname,email,password,callBack) {
                    var user = {
                        "username": username,
                        "password": password,
                        "displayname": displayname,
                        "email": email
                    };

                    $http.post(config.api + "/user",user)
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
