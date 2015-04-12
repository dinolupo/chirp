(function(){
    'use strict';

angular.module('chirp', ['ui.router','ngSanitize','ngCookies'])
    .constant("config",
    {
        //"api": "http://localhost:3000/api/v1",
        "api": "http://chirp.dimotta.net/api/v1",
        "elapsedtime": 5000
    })
    .config(['$logProvider','$stateProvider','$urlRouterProvider', function($logProvider,$stateProvider,$urlRouterProvider)
    {
        $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise("/public");

        $stateProvider
            .state('public', {
                url: "/public",
                templateUrl: 'partials/public-view.html',
                controller: 'PublicCtrl',
                controllerAs: 'vm'
            })
            .state('home', {
                url: "/home",
                templateUrl: 'partials/home-view.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: "/login",
                templateUrl: 'partials/login-form-view.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('following', {
                url: "/following",
                templateUrl: 'partials/following-list-view.html',
                controller: 'FollowingCtrl'
            })
            .state('followers', {
                url: "/followers",
                templateUrl: 'partials/followers-list-view.html',
                controller: 'FollowersCtrl'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: 'partials/register-form-view.html',
                controller: 'RegisterCtrl'
            })
    }
]);

})();
