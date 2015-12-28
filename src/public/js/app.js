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
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('AppController',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService) {
              var ctrl = this;

              ctrl.initViewAsLogged = function () {
                  ctrl.user = AuthService.getUser();
                  ctrl.islogged = true;
              };

              ctrl.logout = function () {
                  AuthService.logout();

                  ctrl.user = null;
                  $cookies.remove("chirp");
                  ctrl.islogged = false;

                  $location.path('/pubic');
                  $location.replace();

                  $scope.$emit('logout');
              };

              $scope.$on('logged', function () {
                  ctrl.initViewAsLogged();
              });

              if(AuthService.isLogged()) {
                  ctrl.initViewAsLogged();
              }
              else {
                  ctrl.islogged = false;

                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                      AuthService.reloadUser(username, function (data) {
                          if(data) {
                              ctrl.initViewAsLogged();
                          }
                      });
                  }
              }
            }
    ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('FollowersController', ['$scope', '$log', '$location','DataService','AuthService',
            function ($scope, $log, $location, DataService, AuthService) {
                var ctrl = this;

                ctrl.initView = function () {
                    DataService.getFollowersList(AuthService.getUser().username,
                        function (data) {
                            ctrl.users = data;
                        });
                };

                if(AuthService.isLogged()) {
                    ctrl.initView();
                }
                else {
                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                      AuthService.reloadUser(username, function(data)
                      {
                          if(data) {
                              ctrl.initView();
                          }
                      });
                  }
                }
            }
        ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('FollowingController', ['$scope', '$log', '$location','DataService','AuthService',
            function ($scope, $log, $location, DataService, AuthService) {
                var ctrl = this;

                ctrl.initView = function () {
                    DataService.getFollowingList(AuthService.getUser().username,
                        function (data) {
                            ctrl.users = data;
                        });
                };

                if(AuthService.isLogged()) {
                    ctrl.initView();
                }
                else
                {
                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                      AuthService.reloadUser(username, function(data)
                      {
                          if(data) {
                              ctrl.initView();
                          }
                      });
                  }
                }
            }
        ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('HomeController', ['$scope','$log','$location','$timeout','$cookies','DataService','AuthService','config',
        function ($scope,$log,$location,$timeout,$cookies,DataService,AuthService,config) {
            var ctrl = this;

            ctrl.initView = function ()
            {
                ctrl.user = AuthService.getUser();
                ctrl.message = '';
            };

            ctrl.send = function (message)
            {
                DataService.sendMessage(ctrl.user.username, message, function (result)
                {
                    if( result )
                    {
                        alert('Message sent!');
                        ctrl.message = '';
                    }
                    else {
                        alert('The message has not been sent!');
                    }
                });
            };

            ctrl.loadPosts = function getData() {
                DataService.getHomePostList(ctrl.user.username,
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            $scope.$on('logged', function() {
                ctrl.initView();
            });

            if(AuthService.isLogged())
            {
                ctrl.initView();
            }
            else
            {
                if( $cookies.chirp )
                {
                    AuthService.reloadUser($cookies.chirp, function(data)
                    {
                        if(data) {
                            ctrl.initView();
                        }
                    });
                }
            }

            ctrl.intervalFunction = function()
            {
                ctrl.loadPosts();

                var promise = $timeout(function(){
                    ctrl.loadPosts();
                    ctrl.intervalFunction();
                }, config.elapsedtime);

                $scope.$on('$destroy', function(){
                    $timeout.cancel(promise);
                });
            };

            ctrl.intervalFunction();
        }]);
})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('InfoController', ['$scope','$log','$stateParams','$cookies','AuthService','DataService',
            function ($scope,$log,$stateParams,$cookies,AuthService,DataService) {
                var ctrl = this;

                ctrl.getData = function() {
                    DataService.getUserInfo($stateParams.username,
                        function (data) {
                            ctrl.user = data;
                        });
                };

                ctrl.checkCanFollow = function() {
                    ctrl.canFollow = true;
                    ctrl.username = AuthService.getUser().username;

                    DataService.getFollowingList(ctrl.username,function(data)
                    {
                        if(data)
                        {
                            data.forEach(function(item, index, array){
                                if(item.username == $stateParams.username)
                                {
                                    ctrl.canFollow = false;
                                }
                            });
                        }
                    });
                };

                ctrl.getData();
                ctrl.showButton = false;

                if( AuthService.isLogged() ) {
                    if(AuthService.getUser().username != $stateParams.username) {
                        ctrl.showButton = true;
                        ctrl.checkCanFollow();
                    }
                }
                else
                {
                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                        if(username != $stateParams.username) {
                            AuthService.reloadUser($cookies.chirp, function(data)
                            {
                                if(data) {
                                    ctrl.showButton = true;
                                    ctrl.checkCanFollow();
                                }
                            });
                        }
                    }
                }
            }
        ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('LoginController', ['$log', '$location', '$cookies', '$rootScope', 'AuthService',
            function ($log, $location, $cookies, $rootScope, AuthService) {
                var ctrl = this;

                ctrl.credentials = {
                    username: '',
                    password: ''
                };

                ctrl.login = function (credentials) {
                    AuthService.login(credentials, function (username) {
                        $log.debug(username);

                        if(username!==undefined)
                        {
                            $cookies.put("chirp",username);

                            $location.path('/home');
                            $location.replace();

                            $rootScope.$broadcast('logged');
                        }
                        else {
                            alert('Wrong credentials!');
                        }
                    });
                };
            }
        ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('PublicController', ['$scope','$log','$timeout','DataService','config',
        function ($scope, $log, $timeout, DataService, config) {
            var ctrl = this;

            ctrl.getData = function(){
                DataService.getPublicPostList(
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            ctrl.intervalFunction = function()
            {
                ctrl.getData();

                var promise = $timeout(function(){
                    ctrl.getData();
                    ctrl.intervalFunction();
                }, config.elapsedtime);

                $scope.$on('$destroy', function(){
                    $timeout.cancel(promise);
                });
            };

            ctrl.intervalFunction();
        }
    ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .controller('RegisterController', ['$scope', '$log', '$location', '$cookies', 'AuthService',
            function ($scope, $log, $location, $cookies, AuthService) {
                var ctrl = this;

                ctrl.signin = function (profile) {
                    if(profile.password != profile.confirmpassword)
                    {
                        alert('Password are different!');
                    }
                    else
                    {
                        AuthService.signin(profile,function()
                        {
                            alert('User signed!');

                            $location.path('/public');
                            $location.replace();
                        });
                    }
                };
            }
        ]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
           .directive("postpanel", function () {
            return {
                restrict: 'E',
                templateUrl: "partials/templates/post-template.html",
                replace: true,
                scope: {
                    post: '=data'
                }
            };
    });

})();
;(function() {
    'use strict';

    angular.module('appChirp')
           .factory("AuthService", ['$http', '$log', 'config', 'DataService',
           function ($http, $log, config, DataService) {
             var _authUser = null;

            return {
                login: function (credentials,callBack)
                {
                    var username = credentials.username;
                    var password = credentials.password;

                    DataService.getUserByCredentials(username,password,
                        function(data) {
                            if(data)
                            {
                                $log.debug("[%s] Logged in user: %s",
                                            new Date().toISOString(),
                                            data.username);

                                _authUser = data;

                                callBack(_authUser.username);
                            }
                            else callBack();
                        }
                    );
                },
                logout: function () {
                    $log.debug("[%s] Logged out user: %s",new Date().toISOString(),_authUser.username);
                    _authUser = null;
                },
                getUser: function () {
                    return _authUser;
                },
                isLogged: function () {
                    if(_authUser!==null)
                    {
                        return true;
                    }
                    return false;
                },
                reloadUser: function(token,callBack) {
                    DataService.getUserByToken(token,
                        function(data) {
                            if(data)
                            {
                                $log.debug("[%s] DataService.reloadUser > %s",new Date().toISOString(),data.username);
                                _authUser = data;
                                callBack(_authUser.username);
                            }
                            else callBack();
                        }
                    );
                },
                signin: function (profile,callBack) {
                    var username = profile.username;
                    var displayname = profile.displayname;
                    var email = profile.email;
                    var password = profile.password;

                    DataService.register(username,displayname,email,password,
                        function() {
                            $log.debug("[%s] DataService.signin > %s",new Date().toISOString(),data.username);
                            callBack();
                        }
                    );
                }
            };
        }]);

})();
;(function() {
    'use strict';

    angular.module('appChirp')
        .factory("DataService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            return {
                getPublicPostList: function (callBack) {
                    $http.get(config.api + "/post/public")
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getHomePostList: function (username,callBack) {
                    $http.get(config.api + "/post/home/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getUserByCredentials: function (username,password,callBack)
                {
                    $http.get(config.api + "/user/authenticate/" + username + "/" + password )
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getUserByToken: function (token,callBack) {
                    $http.get(config.api + "/user/access/" + token)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                sendMessage: function(username,text,callBack){
                    $http.post(config.api + "/post",{"username":username,"text":text})
                        .success(function (data, status, headers, config)  {
                            callBack(true);
                        })
                        .error(function(){
                            callBack(false);
                        });
                },
                getFollowingList: function (username,callBack) {
                    $http.get(config.api + "/user/following/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getFollowersList: function (username,callBack) {
                    $http.get(config.api + "/user/followers/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                register: function(username,displayname,email,password,callBack) {
                    var user = {
                        "username": username,
                        "password": password,
                        "displayname": displayname,
                        "email": email
                    };
                    $http.post(config.api + "/user",user)
                        .success(function (data, status, headers, config)  {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getUserInfo: function(username,callBack) {
                    $http.get(config.api + "/user/info/" + username)
                        .success(function (data, status, headers, config) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                }
            };
        }]);

})();
