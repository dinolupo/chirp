var app = angular.module('chirp', [
    'ngRoute',
    'ngSanitize',
    'appControllers'
]);

var appControllers = angular.module('appControllers', []);

app.config(['$logProvider',
    function($logProvider) {
        $logProvider.debugEnabled(true);
    }
]);

app.constant("config", {
    api: "http://localhost:8080/api/v1",
    websiteurl: "http://localhost:63342/chirp/app/client",
    defaultimage: "default.png"
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/public', {
                templateUrl: 'partials/views/public-view.html',
                controller: 'publicCtrl'
            })
            .when('/home', {
                templateUrl: 'partials/views/home-view.html',
                controller: 'homeCtrl'
            })
            .otherwise({
                redirectTo: '/public'
            });
    }
]);
