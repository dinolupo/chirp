(function(){
    'use strict';

angular.module('chirp', ['ngRoute','ngSanitize']);

var appControllers = angular.module('appControllers', []);

angular.module('chirp')
    .constant("config",
    {
        "api": "http://localhost:3000/api/v1",
        "websiteurl": "http://localhost:63342/chirp/frontend",
        "defaultimage": "default.png"
    });

angular.module('chirp')
    .config(['$logProvider', function($logProvider)
    {
            $logProvider.debugEnabled(true);
    }]);

angular.module('chirp')
    .config(['$routeProvider', function($routeProvider)
    {
        $routeProvider
            .when('/public', {
                templateUrl: 'partials/post-list-view.html',
                controller: 'PublicCtrl'
            })
            .when('/home/:username', {
                templateUrl: 'partials/post-list-view.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/public'
            });
    }
]);

})();
