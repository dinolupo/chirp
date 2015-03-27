
appControllers.controller('ApplicationCtrl', ['$scope', '$log',
    function($scope, $log ) {

        var currentUser = null;

        $scope.setCurrentUser = function (user) {
            currentUser = user;
        };

        $scope.isLogged = function() {
            return (currentUser != null);
        }

        $scope.getUserDisplayName = function(){
            if(currentUser != null) {
                return currentUser.displayName;
            }
            else {
                return "";
            }
        }
    }
]);