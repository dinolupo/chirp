var app = angular.module('chirp', [
    'ngRoute',
    'ngSanitize',
    'appControllers'
]);

app.config(['$logProvider',
    function($logProvider) {
        $logProvider.debugEnabled(true);
    }
]);

app.constant("config", {
    api: "http://localhost:8080/api/v1"
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/views/home-view.html',
                controller: 'homeCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }
]);
