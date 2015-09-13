(function(){
    'use strict';

angular.module('appChirp', ['ui.router','ngSanitize','ngCookies'])
    .constant("config",
    {
        "api": "http://localhost:3000/api/v1",
        //"api": "http://chirp.dimotta.net/api/v1",
        "elapsedtime": 6000
    })
    .config(['$logProvider','$stateProvider','$urlRouterProvider', function($logProvider,$stateProvider,$urlRouterProvider)
    {
        $logProvider.debugEnabled(true);

        $urlRouterProvider.otherwise("/public");

        $stateProvider
            .state('public', {
                url: "/public",
                templateUrl: 'partials/views/public-view.html',
                controller: 'PublicController',
                controllerAs: 'vm'
            })
            .state('home', {
                url: "/home",
                templateUrl: 'partials/views/home-view.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: "/login",
                templateUrl: 'partials/views/login-form-view.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('following', {
                url: "/following",
                templateUrl: 'partials/views/following-list-view.html',
                controller: 'FollowingController',
                controllerAs: 'vm'
            })
            .state('followers', {
                url: "/followers",
                templateUrl: 'partials/views/followers-list-view.html',
                controller: 'FollowersController',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: 'partials/views/register-form-view.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
            .state('info', {
                url: "/info/:username",
                templateUrl: 'partials/views/info-view.html',
                controller: 'InfoController',
                controllerAs: 'vm'
            });
    }
]);

})();
