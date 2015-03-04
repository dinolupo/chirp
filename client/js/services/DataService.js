
app.factory("DataService", [ '$http', '$log', 'config',
    function( $http, $log, config ) {
        return {
            getPublicChirps: function(cbOK,cbNOK){
                $http.get(config.api+ "/public").
                    success(function(data, status, headers, config){
                        cbOK(data);
                    }).
                    error(function(data, status, headers, config){
                        cbNOK();
                    })
            },
            getHomeChirps: function(username,cbOK,cbNOK){
                $http.get(config.api+ "/home/" + username).
                    success(function(data, status, headers, config){
                        cbOK(data);
                    }).
                    error(function(data, status, headers, config){
                        cbNOK();
                    });
            }
        }}]);
