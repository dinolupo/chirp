(function(){
    'use strict';

angular.module('chirp', ['ngRoute','ngSanitize','ngCookies'])
    .constant("config",
    {
        //"api": "http://localhost:3000/api/v1",
        "api": "http://chirp.dimotta.net/api/v1",
        "elapsedtime": 5000
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
            .when('/following',{
                templateUrl: 'partials/following-list-view.html',
                controller: 'FollowingCtrl'
            })
            .when('/followers',{
                templateUrl: 'partials/followers-list-view.html',
                controller: 'FollowersCtrl'
            })
            .when('/signup',{
                templateUrl: 'partials/register-form-view.html',
                controller: 'RegisterCtrl'
            })
            .otherwise({
                redirectTo: '/public'
            });
    }
]);

})();
