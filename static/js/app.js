(function(){
    'use strict';

angular.module('chirp', ['ngRoute','ngSanitize','ngCookies'])
    .constant("config",
    {
        "api": "http://localhost:3000/api/v1",
        "websiteurl": "http://localhost:63342/chirp/frontend",
        "defaultimage": "default.png"
    })
    .config(['$logProvider','$routeProvider', function($logProvider,$routeProvider)
    {
        $logProvider.debugEnabled(true);

        $routeProvider
            .when('/public', {
                templateUrl: 'partials/post-list-view.html',
                controller: 'PublicCtrl'
            })
            .when('/home', {
                templateUrl: 'partials/auth-post-list-view.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login-form-view.html',
                controller: 'LoginCtrl'
            })
            .otherwise({
                redirectTo: '/public'
            });
    }
]);

})();
