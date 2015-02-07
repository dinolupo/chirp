
app.factory("AuthService", [ '$http', '$log', 'config',
    function( $http, $log, config ) {
        return {
            login: function( credentials, cbOk, cbNOK ) {
                var username = credentials.username;
                var password = credentials.password;

                var url = config.api+ "/authenticate";

                $http.post( url, { username: username, password: password }).
                    success(function(data, status, headers, config){
                        cbOk(data);
                    }).
                    error(function(data, status, headers, config){
                        $log.error('error on post request');
                        cbNOK();
                    });
            },
            logout: function() {
                // todo: implement logout
                /*$rootScope.connectedUser = null;
                $location.path('/public');
                $location.replace();*/
            }
        }
    }]);