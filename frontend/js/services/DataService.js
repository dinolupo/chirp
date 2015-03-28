(function() {
    'use strict';

    angular.module('chirp')
        .factory("DataService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            return {
                getPublicPostList: function (cbOK, cbNOK) {
                    $http.get(config.api + "/public").
                        success(function (data, status, headers, config) {
                            cbOK(data);
                        }).
                        error(function (data, status, headers, config) {
                            cbNOK();
                        })
                },
                getHomePostList: function (username, cbOK, cbNOK) {
                    $http.get(config.api + "/home/" + username).
                        success(function (data, status, headers, config) {
                            cbOK(data);
                        }).
                        error(function (data, status, headers, config) {
                            cbNOK();
                        });
                }
            }
        }]);

})();
