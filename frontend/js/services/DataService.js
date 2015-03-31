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
                    $http.get(config.api + "/public").
                        success(function (data) {
                            callBack(data);
                        }).
                        error(dataServiceErrorHandler);
                },
                getHomePostList: function (username,callBack) {
                    $http.get(config.api + "/home/" + username).
                        success(function (data) {
                            callBack(data);
                        }).
                        error(dataServiceErrorHandler);
                },
                getUserByCredentials: function (username,password,callBack) {
                    $http.post(config.api + "/authenticate",{username: username,password: password}).
                        success(function (data) {
                            callBack(data);
                        }).
                        error(dataServiceErrorHandler);
                }
            }
        }]);

})();
